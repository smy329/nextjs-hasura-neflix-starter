import Link from "next/link";
import Image from "next/image"
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import styles from './navbar.module.css'
import {magic} from "../../lib/magic-client"

const Navbar = () => {
    // const { username } = props
    const router = useRouter()

  const [showDropdown, setShowDropdown] = useState(false);
  const [username, setUsername] = useState("")
  
useEffect(() => {
  async function getUsername() {
    try {
      const { email, issuer } = await magic.user.getMetadata();
      const didToken = await magic.user.getIdToken()
      console.log({didToken})
      if (email) {
        console.log(email);
        setUsername(email);
      }
    } catch (error) {
      console.error("Error retrieving email:", error);
    }
  }
  getUsername();
}, []);

    const handleOnClickHome = (e) => {
        e.preventDefault() //prevents page refresh
        router.push("/");
    }

    const handleOnClickMyList = (e) => {
        e.preventDefault();    //prevents page refresh
        router.push("/browse/my-list");
    }

    const handleShowDropdown = (e) => {
        e.preventDefault()
        setShowDropdown(!showDropdown)
    }
  
  const handleSignout = async (e) => {
    e.preventDefault()

    try {
      // await magic.user.logout();
      // console.log(await magic.user.isLoggedIn()); // => `false`
      // router.push("/login")

      const response = await fetch("/api/logout", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${didToken}`,
          "Content-Type": "application/json",
        },
      });
      const res = await response.json();
      
    } catch (error) {
      console.error("Error occurred during signout", error)
      router.push("/login");
    }
  }
    return (
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <Link className={styles.logoLink} href="/">
            <div className={styles.logoWrapper}>
              <Image
                src={"/static/netflix.svg"}
                alt="Logo"
                width="128" //in pixel
                height="34" //in pixel
              />
            </div>
          </Link>

          <ul className={styles.navItems}>
            <li className={styles.navItem} onClick={handleOnClickHome}>
              Home
            </li>
            <li className={styles.navItem2} onClick={handleOnClickMyList}>
              Mylist
            </li>
          </ul>

          <nav className={styles.navContainer}>
            <div>
              <button
                className={styles.usernameBtn}
                onClick={handleShowDropdown}
              >
                <p className={styles.username}> {username}</p>
                <Image
                  src={"/static/expand_more.svg"}
                  alt="Dropdown icon"
                  width="24" //in pixel
                  height="24" //in pixel
                />
              </button>

              {/* Drop Down */}
              {showDropdown && (
                <div className={styles.navDropdown}>
                  <div>
                    {/* <Link href="/login" legacyBehavior> */}
                      <a className={styles.linkName}  onClick={handleSignout}>
                        Signout
                      </a>
                    {/* </Link> */}
                    <div className={styles.lineWrapper}></div>
                  </div>
                </div>
              )}
            </div>
          </nav>
        </div>
      </div>
    );
}

export default Navbar