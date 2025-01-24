// import React from "react";
// import Nav from "./Nav";
// import Image from "next/image";
// import Link from "next/link";
// import LanguageSelect from "../common/LanguageSelect";
// import CurrencySelect from "../common/CurrencySelect";
// import CartLength from "../common/CartLength";
// import WishlistLength from "../common/WishlistLength";
// import styles from './styles.module.scss';

// export default function Header13() {
//   return (
//     <header id="header" className={`${styles['header-default']} header-style-2`}>
//       <div className="main-header">
//         <div className="container-full px_15 lg-px_40">
//           <div className="row wrapper-header align-items-center">
//             {/* <div className="col-xl-4">
//               <div className="search-box" style={{ width: "200px" }}>
//                 <input 
//                   type="text"
//                   placeholder="Pesquisar..."
//                   className="search-input"
//                 />
//               </div>
//             </div> */
//             <div className="col-xl-4">
//   <div className="search-box" style={{ position: "relative", width: "200px" }}>
//     <input
//       type="text"
//       placeholder="Pesquisar..."
//       className="search-input"
//       style={{
//         width: "100%",
//         padding: "10px 40px 10px 15px", // Espaço para a lupa
//         border: "1px solid #ddd",
//         borderRadius: "0px", // Bordas quadradas
//         fontSize: "14px",
//         color: "#333",
//         backgroundColor: "#fff",
//         outline: "none",
//       }}

      
//     />
//     <img
//       src="/images/buscar.svg" // Substitua pelo caminho da sua imagem
//       alt="Lupa"
//       style={{
//         position: "absolute",
//         top: "50%",
//         right: "10px", // Alinha à direita
//         transform: "translateY(-50%)",
//         width: "20px", // Tamanho da imagem
//         height: "20px",
//         cursor: "pointer",
//       }}
//     />
//   </div>
// </div>
// }
//             <div className="col-xl-4 text-center">
//               <Link href="/" className="logo-header">
//                 <Image
//                   alt="logo"
//                   className="logo"
//                   src="/images/gkgrifes.png"
//                   width={273}
//                   height={42}
//                   priority
//                 />
//               </Link>
//             </div>
//             <div className="col-xl-4">
//               <div className="d-flex justify-content-end align-items-center gap-3">
//                 <div className="d-flex gap-3">
//                   <Link href="/user" className="nav-icon-item">
//                     <Image
//                       src="/images/user.svg"
//                       alt="Minha Conta"
//                       width={24}
//                       height={24}
//                     />
//                   </Link>
//                   <Link href="/carrinho" className="nav-icon-item">
//                     <Image
//                       src="/images/cart.svg"
//                       alt="Carrinho"
//                       width={24}
//                       height={24}
//                     />
//                   </Link>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//       <div className="header-bottom">
//         <div className="container-full px_15 lg-px_40">
//           <div className="wrapper-header">
//             <nav className="box-navigation text-center">
//               <ul className="box-nav-ul d-flex align-items-center justify-content-center gap-30">
//                 <li className="menu-item">
//                   <Link href="/produtos" className="item-link">Produtos</Link>
//                 </li>
//                 <li className="menu-item">
//                   <Link href="/vestuario" className="item-link">Vestuário</Link>
//                 </li>
//                 <li className="menu-item">
//                   <Link href="/acessorios" className="item-link">Acessórios</Link>
//                 </li>
//                 <li className="menu-item">
//                   <Link href="/sob-encomenda" className="item-link">Sob Encomenda</Link>
//                 </li>
//               </ul>
//             </nav>
//           </div>
//         </div>
//       </div>
//     </header>
//   );
// }


import React from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./styles.module.scss";

export default function Header13() {
  return (
    <header id="header" className={styles["header-default"]}>
      <div className={styles["main-header"]}>
        <div className="container-full px_15 lg-px_40">
          <div className="row wrapper-header align-items-center">
            {/* Barra de pesquisa no layout normal */}
            <div className="col-xl-4 d-flex align-items-center">
              <div className={styles["search-box"]}>
                <input
                  type="text"
                  placeholder="Pesquisar..."
                  className={styles["search-input"]}
                />
                <Image
                  src="/images/buscar.svg"
                  alt="Ícone de busca"
                  width={24}
                  height={24}
                  className={styles["search-icon"]}
                />
              </div>
            </div>

            {/* Logo centralizada */}
            <div className="col-xl-4 text-center">
              <Link href="/" className={styles["logo-header"]}>
                <Image
                  alt="logo"
                  className={styles["logo"]}
                  src="/images/gkgrifes.png"
                  width={200}
                  height={35}
                  priority
                />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Ícones organizados no media query */}
      <div className={styles["media-icons"]}>
        {/* Ícone de pesquisa à esquerda */}
        <Image
          src="/images/buscar.svg"
          alt="Ícone de busca"
          width={24}
          height={24}
          className={styles["search-icon-media"]}
        />

        {/* Ícones de usuário e carrinho à direita */}
        <div className="d-flex gap-3">
          <Link href="/user" className="nav-icon-item">
            <Image
              src="/images/user.svg"
              alt="Minha Conta"
              width={24}
              height={24}
            />
          </Link>
          <Link href="/carrinho" className="nav-icon-item">
            <Image
              src="/images/cart.svg"
              alt="Carrinho"
              width={24}
              height={24}
            />
          </Link>
        </div>
      </div>
    </header>
  );
}
