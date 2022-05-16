import Image from 'next/image';
import Link from 'next/link';

import styles from './navbar.module.css';
import { magic } from '../../lib/magic-client';

import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';

const Navbar = () => {
  const [username, setUsername] = useState('');

  useEffect(() => {
    const magicEmail = async () => {
      try {
        const { email, publicAddress } = await magic.user.getMetadata();
        if (email) {
          setUsername(email);
        }
      } catch (error) {
        console.error('Error retrieving email', error);
      }
    };
    magicEmail();
  }, [magic]);

  const [showDropdown, setShowDropdown] = useState(false);

  const router = useRouter();

  const handleHome = (e) => {
    e.preventDefault();
    router.push('/');
  };

  const handleMyList = (e) => {
    e.preventDefault();
    router.push('/browse/my-list');
  };

  const handleShowDropdown = (e) => {
    e.preventDefault();
    setShowDropdown(!showDropdown);
  };

  const handleSignOut = async (e) => {
    e.preventDefault();
    try {
      await magic.user.logout();
      console.log(await magic.user.isLoggedIn());
      router.push('/login');
    } catch (error) {
      console.error('Error loging out', error);
      router.push('/login');
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <Link href='/'>
          <a className={styles.logoLink}>
            <div className={styles.logoWrapper}>
              <Image
                src='/static/logos/main-logo.svg'
                alt='Bing Chilling logo'
                width='400px'
                height='220px'
              />
            </div>
          </a>
        </Link>
        <ul className={styles.navItems}>
          <li className={styles.navItem} onClick={handleHome}>
            Home
          </li>
          <li className={styles.navItem2} onClick={handleMyList}>
            My List
          </li>
        </ul>
        <nav className={styles.navContainer}>
          <div>
            <button className={styles.usernameBtn} onClick={handleShowDropdown}>
              <p className={styles.username}>{username}</p>
              <Image
                src='/static/icons/expand-more.png'
                alt='Expand more icon'
                width='24px'
                height='24px'
              />
            </button>
            {showDropdown && (
              <div className={styles.navDropdown}>
                <div>
                  <a className={styles.linkName} onClick={handleSignOut}>
                    Sign out
                  </a>
                  <div className={styles.lineWrapper} />
                </div>
              </div>
            )}
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
