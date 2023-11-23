// pages/signup.js
import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Link from 'next/link';

// Validation şemalarını tanımla
const validationSchema = Yup.object({
    username: Yup.string().required('Username is required'),
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
});

const Signup = () => {
    // Form submit işlemi
    const handleSubmit = (values) => {
        // Form submit işlemleri burada gerçekleştirilebilir
        console.log('Form submitted with values:', values);
    };

    return (
        <div>
            <h1>Signup Page</h1>
            <Formik
                initialValues={{ username: '', email: '', password: '' }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                <Form>
                    <div>
                        <label htmlFor="username">Username:</label>
                        <Field type="text" id="username" name="username" />
                        <ErrorMessage name="username" component="div" />
                    </div>

                    <div>
                        <label htmlFor="email">Email:</label>
                        <Field type="text" id="email" name="email" />
                        <ErrorMessage name="email" component="div" />
                    </div>

                    <div>
                        <label htmlFor="password">Password:</label>
                        <Field type="password" id="password" name="password" />
                        <ErrorMessage name="password" component="div" />
                    </div>

                    <button type="submit">Signup</button>
                </Form>
            </Formik>

            <Link href="/">
                <button>
                    Go back to Home
                </button>
            </Link>
        </div>
    );
};

export default Signup;
