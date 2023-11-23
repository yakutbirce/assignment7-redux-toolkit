// pages/index.js
import { decrement, increment } from '@/store/counterSlice';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';

const Home = () => {
  const count = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();

  return (
    <div>
      <h2>Counter: {count}</h2>
      <button onClick={() => dispatch(increment())}>Increment</button>
      <button onClick={() => dispatch(decrement())}>Decrement</button>

      {/* Todo sayfasına geçiş için Link */}
      <Link href="/todo">
        <button>
          Go to ToDo page
        </button>
      </Link>

      {/* Login sayfasına geçiş için Link */}
      <Link href="/login">
        <button>
          Go to Login page
        </button>
      </Link>

      {/* Signup sayfasına geçiş için Link */}
      <Link href="/signup">
        <button>
          Go to Signup page
        </button>
      </Link>
    </div>
  );
};

export default Home;
