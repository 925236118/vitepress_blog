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
    <template #doc-after>
      <p style="border-top: 1px solid #eee;text-align: center;margin-top: 25px;padding-top: 25px;font-size: 0.8em"><a href="https://beian.miit.gov.cn/">黑ICP备17004898号-1</a></p>
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