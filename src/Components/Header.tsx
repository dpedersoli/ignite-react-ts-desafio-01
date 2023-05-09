import styles from './Header.module.css'

import LogoDesafio from '../assets/logo-desafio-ignite.svg'

export function Header() {
  return (
    <>
    <header className={styles.header}>
      <img src={LogoDesafio} alt="Logotipo do desafio 01 de react da Rocketseat" />
    </header>
    </>
  )
}