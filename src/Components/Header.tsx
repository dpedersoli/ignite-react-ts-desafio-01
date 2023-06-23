import styles from './Header.module.css'

import LogoDesafio from '../assets/white-logo-Daniel-Pedersoli.png'

export function Header() {
  return (
    <>
    <header className={styles.header}>
      <img src={LogoDesafio} alt="Logotipo do desafio 01 de react da Rocketseat" />
      <h1><span>to</span>do</h1>
    </header>
    </>
  )
}