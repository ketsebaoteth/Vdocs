import type { NavbarConfig } from "../types/configs/navbar";

export let NavbarConfigeration: NavbarConfig = {
    ShowLogoImg: true,
    LogoSrc: "/assets/logo.png",
    ShowLogoHeader: true,
    LogoHeader: "Vdocs",
    ShowLogoSearch: true,
    navbarItems: [
        {
            title: "Documentation",
            route: "/docs",
            isExternal: false,
            children: []
        },
        {
            title: "Blog",
            route: "/",
            isExternal: false,
            children: []
        },
        {
            title: "About",
            route: "/",
            isExternal: false,
            children: []
        },
        {
            title: "Github",
            route: "",
            isExternal: true,
            children: []
        }
    ],
    ShowLanguageToggle: true,
    Languages: ["enlish", "Amharic", "Tigrigna"],
    ShowThemeToggle: true,
    Themes: ["light", "dark"],
    ShowGithubAccount: true,
    GithubAccount: "ketsebaoteth/vdocs",
    ShowGihtubStars: true,
    ShowSocials: true,
    Socials: [
        {
            name: "Facebook",
            link: "https://www.facebook.com",
            icon: "facebook"
        },
        {
            name: "Twitter",
            link: "https://www.twitter.com",
            icon: "twitter"
        },
        {
            name: "Instagram",
            link: "https://www.instagram.com",
            icon: "instagram"
        }
    ]
}