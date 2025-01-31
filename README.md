# VDocs Documentation Sites With A Glitter Of Beauty

<img src="https://github.com/user-attachments/assets/1d2b281d-3149-4b33-937f-e43cabe65477" alt="description" width="100%">

VDocs is a tool for creating server-side rendered documentation sites directly from your project's documentation files. It is designed to be framework and language agnostic, making it suitable for a wide range of projects. VDocs utilizes Markdown (with MDX support) for content creation.

## Getting Started

**Prerequisites:**

*   Node.js
*   npm (or compatible package manager)

**Installation:**

1.  Open your project's root directory in your terminal.
2.  Run the following command:
    ```bash
    npx vdocs@latest init <your-project-name>
    ```
    This will create a `vdocs` directory within your project.
3.  Navigate into the new `vdocs` directory:
    ```bash
    cd <your-project-name>
    ```
4.  Install VDocs dependencies:
    ```bash
    npm install
    ```
    VDocs is now ready to run!

## Basic Usage

VDocs leverages your project's file structure to create your documentation site. Here's a quick overview:

*   **Configuration:** VDocs uses TypeScript configuration files located in the `config/` directory within your `vdocs` project. Modify these `.tsx` files to customize the site (e.g., navigation bar, general settings).
*   **Styling:** The site's appearance is primarily managed through the `global.css` file. It is recommended to use CSS variables for colors and styles within this file. *Note:* We made a conscious decision to use a standard css file for styling over complex configuration files for ease of use and better editing support in IDE's.
*   **Documentation Pages:** VDocs generates documentation pages based on the folder structure inside the `/docs/` directory. This structure mirrors the navigation on your documentation site.
    *   **Version Management:** Document versions using the `@v<version>` naming convention inside the `/docs/` folder. For example, `/docs/@v1.0.0` or `/docs/@v1.1.0`.
        *   **Partial Versioning:** You *don't* need to duplicate the entire `/docs/` structure for every version. Only include the folders and markdown files that have actually changed from the base version. For example, if only two files change in `@v1.1.0`, only those files need to exist in the `/docs/@v1.1.0/` directory. VDocs will then take the default documentation structure and only override the sections modified by a newer version.

_More detailed documentation is coming soon. Visit our website for the full documentation when it becomes available._

## Contributing

VDocs is a solo project that benefits greatly from your contributions. We welcome pull requests, feature requests, and bug reports. Before contributing, please note that:

*   We have a review process in place to ensure code quality.
*   If we need to guide you to achieve your contribution goal we will do our best to help.
*   Contributions should align with the overall project goals.

If you're ready to help improve VDocs, check our open issues on our github page to see if there is anything you want to help with.
