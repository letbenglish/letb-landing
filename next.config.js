/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Links curtos impressos nos QR codes do livro "Let There B Light".
  // O QR aponta para o link curto; para trocar o destino, mude só o "destination".
  // permanent: false (307) para que o navegador não guarde o destino em cache.
  async redirects() {
    return [
      { source: '/light1', destination: '/light/you-did-it.html', permanent: false },
      { source: '/light1/week1', destination: '/light/week1.html', permanent: false },
      { source: '/light1/week2', destination: '/light/week2.html', permanent: false },
      { source: '/light1/week3', destination: '/light/week3.html', permanent: false },
      { source: '/light1/week4', destination: '/light/week4.html', permanent: false },
      { source: '/light1/week5', destination: '/light/week5.html', permanent: false },
      { source: '/light1/week6', destination: '/light/week6.html', permanent: false },
      { source: '/light1/words', destination: '/light/words.html', permanent: false },
    ]
  },
}
module.exports = nextConfig
