"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import styles from "./Sidebar.module.css";
import classNames from "classnames";

export const Sidebar = () => {
  const currentPage = usePathname();

  console.log(currentPage);

  return (
    <div
      className={classNames(
        "d-flex flex-column flex-shrink-0 p-3 text-white bg-dark",
        styles.wrapper
      )}
    >
      <Link
        href="/"
        className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none"
      >
        <span className="fs-4">Meu consultório</span>
      </Link>
      <hr />
      <ul className="nav nav-pills flex-column mb-auto">
        <li className="nav-item">
          <Link
            href="/"
            className={classNames("nav-link text-white", {
              ["active"]: currentPage === "/",
            })}
            aria-current="page"
          >
            Painel
          </Link>
        </li>
        <li>
          <Link
            href="/schedules"
            className={classNames("nav-link text-white", {
              ["active"]: currentPage === "/schedules",
            })}
          >
            Agendamentos
          </Link>
        </li>
      </ul>
      <hr />
      <div className="dropdown">
        <a
          href="#"
          className="d-flex align-items-center text-white text-decoration-none dropdown-toggle"
          id="dropdownUser1"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <Image
            src="https://thispersondoesnotexist.com/"
            alt=""
            width="32"
            height="32"
            className="rounded-circle me-2"
          />
          <strong>Funalo de tal</strong>
        </a>
        <ul
          className="dropdown-menu dropdown-menu-dark text-small shadow"
          aria-labelledby="dropdownUser1"
        >
          <li>
            <Link className="dropdown-item" href="#">
              Configurações
            </Link>
          </li>
          <li>
            <Link className="dropdown-item" href="#">
              Perfil
            </Link>
          </li>
          <li>
            <hr className="dropdown-divider" />
          </li>
          <li>
            <Link className="dropdown-item" href="#">
              Sair
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};
