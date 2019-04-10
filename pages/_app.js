/**
 * @file Application wrapper
 * @author Sergey Dunaevskiy (dunaevskiy) <sergey@dunaevskiy.eu>
 */

import React from 'react';
import App, { Container } from 'next/app';

import store from 'store';
import { Provider } from 'react-redux';
import withRedux from 'next-redux-wrapper';

import {} from 'utils/react-table.util';
import {} from 'utils/axios.util';

import 'styles/index.scss';

class MyApp extends App {
   static async getInitialProps({ Component, ctx }) {
      // // we can dispatch from here too
      // ctx.store.dispatch({ type: 'FOO', payload: 'foo' });

      const pageProps = Component.getInitialProps ? await Component.getInitialProps(ctx) : {};

      return {
         pageProps,
      };
   }

   render() {
      const { Component, pageProps, store } = this.props;
      return (
         <Container>
            <Provider store={store}>
               <Component {...pageProps} />
            </Provider>
         </Container>
      );
   }
}

export default withRedux(store)(MyApp);
