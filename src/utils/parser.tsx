import React from "react";

type RenderableNode = React.ReactNode;

type ParsedHTML = {
    content: RenderableNode[];
    picture: React.ReactNode | null;
};

export function parser(html: string): ParsedHTML {
    const parser = new DOMParser();
    const doc = parser.parseFromString(`<div>${html}</div>`, "text/html");
    const container = doc.body.firstChild as HTMLElement;

    const picture = (container.textContent || "").includes("pictured")
        ? parserPicture()
        : null;

    return {
        content: Array.from(container.childNodes).map((node, index) =>
            transformNode(node, index)
        ),
        picture
    };
}

function transformNode(node: ChildNode, key: React.Key): React.ReactNode {
    if (node.nodeType === Node.TEXT_NODE) {
        return node.textContent;
    }

    if (node.nodeType === Node.COMMENT_NODE) {
        return null;
    }

    if (node.nodeType === Node.ELEMENT_NODE) {
        const element = node as HTMLElement;
        const children = Array.from(element.childNodes).map((child, index) =>
            transformNode(child, index)
        );

        switch (element.tagName.toLowerCase()) {
            case "a": {
                const href = element.getAttribute("href") || "";

                const normalizedHref = href.replace("./", "https://en.wikipedia.org/wiki/").replace(/\s+/g, "_");

                return (
                    <a key={key} href={normalizedHref}>
                        {children}
                    </a>
                );
            }

            case "b":
            case "strong":
                return <span className="font-bold" key={key}>{children}</span>;

            case "i":
            case "em":
                return <span className="italic" key={key}>{children}</span>;

            case "br":
                return null;

            default:
                return <React.Fragment key={key}>{children}</React.Fragment>;
        }
    }

    return null;
}

{/* TODO: fetch and render image referenced in text via 'pictured' */}
function parserPicture(): React.ReactNode {
    return null;
}