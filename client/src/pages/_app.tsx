// pages/_app.tsx
import React, { Component, ReactElement, ReactNode } from 'react';
import { NextPage } from 'next'
import type { AppProps } from 'next/app';
import NavBar from '../layout/navBar.component';
import Head from 'next/head'
import '../styles/globals.css'
import PageLayout from '@/layout/PageLayout.component';

export type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode
}

export type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

export default function App(props: AppPropsWithLayout) {
  const { Component, pageProps } = props
  const getLayout = Component.getLayout ?? ((page) => page)
  const pageComponent = getLayout(<Component {...pageProps} />)
  
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
      </Head>
      <PageLayout childern={pageComponent} />
    </>
  );
}
