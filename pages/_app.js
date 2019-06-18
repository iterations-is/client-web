/**
 * @file Application wrapper
 * @author Sergey Dunaevskiy (dunaevskiy) <sergey@dunaevskiy.eu>
 */

import React from 'react';
import App, { Container } from 'next/app';
import ErrorPage from 'next/error';
import NProgress from 'nprogress';

import store from 'store';
import { Provider } from 'react-redux';
import withRedux from 'next-redux-wrapper';

import {} from 'utils/react-table.util';
import {} from 'utils/axios.util';
import {} from 'utils/noty.util';

import 'styles/index.scss';
import { ErrorGetInitialProps } from 'utils/errors.util';

import Router from 'next/router';

Router.events.on('routeChangeStart', url => {
   NProgress.start();
});
+Router.events.on('routeChangeComplete', () => NProgress.done());
+Router.events.on('routeChangeError', () => NProgress.done());

const PageWrapper = Component => {
   return class WithError extends React.Component {
      static async getInitialProps(ctx) {
         let props = {};
         try {
            props = Component.getInitialProps ? await Component.getInitialProps(ctx) : {};
         } catch (e) {
            if (e instanceof ErrorGetInitialProps) {
               props.statusCode = e.responseCode;
            } else {
               console.log(e);
               props.statusCode = 500;
            }
            if (ctx.res) ctx.res.statusCode = props.statusCode;
         }
         return props;
      }
      render() {
         if (this.props.statusCode) {
            return <ErrorPage statusCode={this.props.statusCode} />;
         }
         return <Component {...this.props} />;
      }
   };
};

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
               {/*{this.props.errorCode !== null ? (*/}
               {/*<ErrorPage statusCode={this.props.errorCode} />*/}
               {/*) : (*/}
               <Component {...pageProps} />
               {/*)}*/}
            </Provider>
         </Container>
      );
   }
}

export default withRedux(store)(PageWrapper(MyApp));
