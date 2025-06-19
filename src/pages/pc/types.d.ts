export interface Markdown {
    html: string;
    desc?: string;
    demo?: string;
    api?: string;
    guide?: string;
}

export interface Content {
    name: string;
    sort: number;
    html: string;
    key: string;
    code?: string;
    icon?: string;
    htmlDesc?: string;
    htmlApi?: string;
    htmlDemo?: string;
    htmlGuide?: string;
}
export interface Group {
    group: string;
    key: string;
    sort: number;
    lock?: boolean;
    contents: Content[];
}

export interface MarkdownData {
    contents: Ref<Group[]>;
    active: Ref<string>;
    setActive: (key: string) => void;
    viewMarkdown: ComputedRef<Content>;
    h5url: Ref<string>;
    isComponent: Ref<boolean>;
}

export interface NavItem {
    title: string;
    key: string;
}
