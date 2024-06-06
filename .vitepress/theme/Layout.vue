<!--.vitepress/theme/MyLayout.vue-->
<script setup>
import { useData } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
const { page } = useData()

const { Layout } = DefaultTheme

</script>

<template>
  <Layout>
    <template #doc-before>
      <h1 :id="page.relativePath.split('.').slice(0, -1).join('')">{{page.relativePath.split('.').slice(0, -1).join('')}}</h1>
    </template>
  </Layout>
</template>

<style>
h1 {
    letter-spacing: -0.02em;
    line-height: 40px;
    font-size: 32px;
    max-width: 688px;
    font-weight: 900;
}
</style>