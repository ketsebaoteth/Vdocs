export interface NavbarItem {
    title: string;
    route: string;
    isExternal: boolean;
    children: NavbarItem[];
}

export interface social {
    name: string;
    link: string;
    icon: string;
}

export interface NavbarConfig {
    ShowLogoImg: boolean
    LogoSrc: string;
    ShowLogoHeader: boolean;
    LogoHeader: string;
    ShowLogoSearch: boolean;
    navbarItems: NavbarItem[];
    ShowLanguageToggle: boolean;
    Languages: string[];
    ShowThemeToggle: boolean;
    Themes: string[];
    ShowGithubAccount: boolean;
    GithubAccount: string;
    ShowGihtubStars: boolean;
    ShowSocials: boolean;
    Socials: social[];
}