// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import mermaid from 'astro-mermaid';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import { remarkReadingTime } from './src/utils/reading-time.js';

export default defineConfig({
  markdown: {
    remarkPlugins: [remarkMath, remarkReadingTime],
    rehypePlugins: [rehypeKatex],
  },
  integrations: [mermaid({ autoTheme: true }), starlight({
    title: '電子回路の学習ノート',
    description: '電子回路・電子部品・電子計測を基礎から学ぶ技術教材。',
    defaultLocale: 'root',
    locales: { root: { label: '日本語', lang: 'ja' } },
    customCss: ['./src/styles/starlight.css'],
    sidebar: [
      { label: 'はじめに', items: [{ label: 'ホーム', link: '/' }, { label: '学習ロードマップ', slug: 'roadmap' }, { label: 'このサイトについて', slug: 'about' }] },
      { label: '01 電子回路の基礎', items: [{ autogenerate: { directory: 'basics' } }] },
      { label: '02 電子部品を知る', items: [{ autogenerate: { directory: 'components' } }] },
      { label: '03 基本回路を読む', items: [{ autogenerate: { directory: 'circuits' } }] },
      { label: '04 測定器を使う', items: [{ autogenerate: { directory: 'measurement' } }] },
      { label: '05 実験で確かめる', items: [{ autogenerate: { directory: 'experiments' } }] },
      { label: '06 故障を切り分ける', items: [{ autogenerate: { directory: 'troubleshooting' } }] },
      { label: '07 回路を設計する', items: [{ autogenerate: { directory: 'design' } }] },
    ],
  })],
});
