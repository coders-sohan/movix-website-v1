import { useCallback, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { HiOutlineSearch } from "react-icons/hi";
import { SlMenu } from "react-icons/sl";
import { VscChromeClose } from "react-icons/vsc";
import ContentWrapper from "../ContentWrapper/ContentWrapper";
import Logo from "../../assets/images/movix-logo.svg";
import "./styles.scss";

const Navbar = () => {
  const [show, setShow] = useState("top");
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [query, setQuery] = useState("");
  const [showSearch, setShowSearch] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  const controlNavbar = useCallback(() => {
    if (window.scrollY > 100) {
      if (window.scrollY > lastScrollY && !mobileMenu) {
        setShow("hide");
      } else {
        setShow("show");
      }
      setLastScrollY(window.scrollY);
    } else {
      setShow("top");
    }
  }, [lastScrollY, mobileMenu]); // include dependencies here

  useEffect(() => {
    window.addEventListener("scroll", controlNavbar);
    return () => {
      window.removeEventListener("scroll", controlNavbar);
    };
  }, [controlNavbar]); // controlNavbar is now memoized and won't change on every render

  const handleSearchQuery = (e, isButtonClick = false) => {
    e.preventDefault();
    if ((e.key === "Enter" || isButtonClick) && query.length > 0) {
      navigate(`/search/${query}`);
      setTimeout(() => {
        setShowSearch(false);
      }, 2000);
    }
  };

  const openSearch = () => {
    setShowSearch(true);
    setMobileMenu(false);
  };

  const openMobileMenu = () => {
    setMobileMenu(true);
    setShowSearch(false);
  };

  const navigationHandler = (type) => {
    if (type === "movies") {
      navigate("/explore/movie");
    }
    if (type === "tv-shows") {
      navigate("/explore/tv");
    }
    if (type === "dramas") {
      navigate("/explore/drama");
    }
    setMobileMenu(false);
  };

  const data = [
    {
      id: 1,
      name: "Movies",
      level: "movies",
    },
    {
      id: 2,
      name: "TV Shows",
      level: "tv-shows",
    },
    {
      id: 3,
      name: "Dramas",
      level: "dramas",
    },
  ];

  return (
    <>
      <header className={`header ${mobileMenu ? "mobileView" : ""} ${show}`}>
        <ContentWrapper>
          <Link to={"/"} className="logo">
            <img src={Logo} alt="Movix" />
          </Link>
          <ul className="menuItems">
            {data.map((item) => (
              <li
                key={item.id}
                className="menuItem"
                onClick={() => navigationHandler(item.level)}
              >
                {item.name}
              </li>
            ))}

            <li className="menuItem">
              <HiOutlineSearch onClick={openSearch} />
            </li>
          </ul>

          <div className="mobileMenuItems">
            <HiOutlineSearch onClick={openSearch} />
            {mobileMenu ? (
              <VscChromeClose onClick={() => setMobileMenu(false)} />
            ) : (
              <SlMenu onClick={openMobileMenu} />
            )}
          </div>
        </ContentWrapper>
        {showSearch && (
          <div className="searchBar">
            <ContentWrapper>
              <div className="searchInput">
                <input
                  type="text"
                  placeholder="Search for a movie, tv show, person..."
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyUp={handleSearchQuery}
                />
                <VscChromeClose onClick={() => setShowSearch(false)} />
              </div>
            </ContentWrapper>
          </div>
        )}
      </header>
    </>
  );
};

export default Navbar;
