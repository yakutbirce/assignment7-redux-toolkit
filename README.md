# Redux Toolkit

## 1. createSlice

`createSlice`, Redux'ta daha az kod yazmak için kullanılır. Bu fonksiyon sayesinde daha az kod yazıp işlemi sadeleştirmiş oluruz.

- Bu fonksiyon aynı zamanda action types ve action generator'ları bizim için otomatik oluşturur. Böylece otomatik kod üretimi sayesinde sürekli aynı kodları yazmak zorunda kalmayız.

- Oluşturulan slice kodumuzu daha düzenli ve anlaşılır hale getirir. Reducer fonksiyonları ve action generator'ları aynı yerde bulabiliriz.

Şimdi basit bir shopping cart uygulamasını Redux Toolkit ve `createSlice` kullanarak yapalım.

```javascript
import { createSlice } from "@reduxjs/toolkit";

// Shopping cart slice'ı oluşturalım
const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
  },
  reducers: {
    // Sepete ürün ekle
    addItem: (state, action) => {
      const newItem = action.payload;
      state.items.push(newItem);
    },
    // Sepetten ürün çıkar
    removeItem: (state, action) => {
      const itemIdToRemove = action.payload;
      state.items = state.items.filter((item) => item.id !== itemIdToRemove);
    },
  },
});

// Action generators export etme
export const { addItem, removeItem } = cartSlice.actions;

// Reducer export etme
export default cartSlice.reducer;
```

Burada shopping cart app için `createSlice` kullanarak bir slice oluşturduk. Bu slice'ımız başlangıçta bir ürün listesi içeriyor. Sepete yeni bir ürün eklemek üzere kullanmak için`addItem` adında bir reducer tanımladık. Sepetten ürün çıkarmak için de `removeItem` adında bir reducer tanımladık.

Sıra bu slice'ı React component içinde kullanmaya geldi:

```javascript
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItem, removeItem } from "../redux/cartSlice";

const ShoppingCart = () => {
  /*Component fonksiyonu oluştur*/
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  const handleAddItem = (item) => {
    /*Sepete yeni ürün ekleme*/
    dispatch(addItem(item));
  };

  const handleRemoveItem = (itemId) => {
    /*Sepetten ürün çıkarma */
    dispatch(removeItem(itemId));
  };

  return (
    /*JSX içinde sepeti görüntüleme*/
    <div>
      <h2>Shopping Cart</h2>
      <ul>
        {cartItems.map((item) => (
          <li key={item.id}>
            {item.name} -
            <button onClick={() => handleRemoveItem(item.id)}>Remove</button>
          </li>
        ))}
      </ul>
      <h3>Available Items</h3>
      <ul>
        {/* Mevcut ögelerin bir listesinin olduğunu varsayalım */}
        <li>
          Product A -{" "}
          <button onClick={() => handleAddItem({ id: 1, name: "Product A" })}>
            Add to Cart
          </button>
        </li>
        <li>
          Product B -{" "}
          <button onClick={() => handleAddItem({ id: 2, name: "Product B" })}>
            Add to Cart
          </button>
        </li>
      </ul>
    </div>
  );
};

export default ShoppingCart;
```

Burada JSX içinde cart'ta bulunan ürünleri listeleyen ve ürün çıkarmak için buton içeren bir liste görüntülenir. Kullanıcıya sepete ürün eklemek için de buton sunulur.

## 2. configureStore

`configureStore` , Redux Store'u yapılandırmak için kullanılan bir fonksiyondur. Neler sağladığına bakacak olursak;

- Default ayarlar içerir. Bu şekilde de Redux store'u hızlı bir şekilde oluşturabiliriz.

- `configureStore` içinde Redux DevTools default olarak bulunur.

- State güncellemeleri için kullanılan Immer `configureStore` içinde otomatik olarak etkindir.

Yukarıdaki shopping cart app'i `configureStore` ile kullanalım.
İlk olarak Redux store yapılandırmak için bir store oluşturalım:

```javascript
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Provider } from "react-redux";
import store from "./redux/store";

// Redux store'u React'e entegre et
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
```

Burada `Provider` ile Redux store'u `App`'e entegre ediyoruz ve böylece `App` ve alt componentleri Redux store'a erişebilirler.

## 3. createAsyncThunk

`createAsyncThunk` fonksiyonu, Redux Toolkit içinde asenkron işlemleri daha kolay yönetmek için kullanılır. Sağladığı kolaylıklara bakacak olursak;

- Async işlemleri daha temiz bir şekilde oluşturmamızı sağlar.
- `createAsyncThunk`, async işlemleri başlattığımızda state'i otomatik olarak günceller.
- Async işlemleri ele almak için gerekli olan çok sayıda kodu azaltıp daha okunabilir hale getirir.

```javascript
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchTodos = createAsyncThunk("todo/fetchTodos", async () => {
  const response = await axios.get(
    "https://jsonplaceholder.typicode.com/todos/"
  );
  return response.data;
});
```

## 4. Reducer

Redux store state'i güncelleyip yeni state dönen bir fonksiyondur.

- `createSlice` veya doğrudan `createReducer` kullanarak oluşturabiliriz.

```javascript
const counterReducer = (state = 0, action) => {
  switch (action.type) {
    case "increment":
      return state + 1;
    case "decrement":
      return state - 1;
    default:
      return state;
  }
};
```

## 5. Slice

Redux store'un bir parçasıdır. Bir slice, initial state, actions ve reducer içerir.

- Bir Redux app'te slice, örneğin bir counter'ın durumu ve işlemleri gibi state'i yöneten ve update eden bir yapıdır.

## 6. Provider

Redux, application state'i merkezi bir depoda yönetir. `Provider` bu depodan gelen datayı, app'teki tüm componentlere aktarmanın ve erişmenin bir yoludur. Böylece state güncellendiğinde tüm componentler otomatik olarak güncellenir.

- `Provider` kullanmak için genellikle app'in en üst düzeyinde yani `index.js` dosyasında componenti sarmalamamız gerekir:

```javascript
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Provider } from "react-redux";
import store from "./store";

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
```

Burada;
` <Provider store={store}>`: Redux store'u, Provider componentine bir prop olarak iletir.

`<App />`: Uygulamanın ana componenti, Provider içine yerleştirilir.

`Provider` sayesinde datayı prop olarak manuel iletmek zorunda kalmayız ve componentler otomatik olarak bu dataya erişebilir.

## 7. useSelector ve useDispatch

`useSelector` :

- Redux store'un durumunu okumak için kullanılır. Mesela bir counter'ımız varsa ve bu counterın değerini görmek istiyorsak `useSelector` kullanabiliriz.

```javascript
import React from "react";
import { useSelector } from "react-redux";

const CounterDisplay = () => {
  // sayacın güncel değerini alıyoruz
  const count = useSelector((state) => state.counter);

  // Ekranda sayacın değerini göster
  return <p>Sayacın Değeri: {count}</p>;
};
```

`useDispatch`

- Redux store'a action göndermek için kullanırız.
- Örneğin counter'ı artırmak veya azaltmak istiyorsak `useDispatch` kullanabiliriz.

```javascript
import React from "react";
import { useDispatch } from "react-redux";
import { increment, decrement } from "./counterSlice";

const CounterButtons = () => {
  // useDispatch ile action gönderme fonksiyonunu al
  const dispatch = useDispatch();

  // Sayacı artıran ve azaltan butonlar
  return (
    <div>
      <button onClick={() => dispatch(increment())}>Artır</button>
      <button onClick={() => dispatch(decrement())}>Azalt</button>
    </div>
  );
};
```
