export type LoginMode = 'base' | 'mode1';

export type LoginItemType = 'number' | 'password' | 'select' | 'txt' | 'validate';

export interface BaseConfigItem {
    title: string;
    key: string;
    style?: Record<string, any>;
}

export interface ProtocolItem extends BaseConfigItem {}

export interface BtnItem extends BaseConfigItem {
    round?: boolean;
}

export interface LoginItem extends BaseConfigItem {
    type?: LoginItemType;
    placeholder?: string;
    value?: string;
    maxlength?: number;
    disabled?: boolean;
    readonly?: boolean;
    icon?: string;
    selectData?: BaseConfigItem[];
}

export interface LoginGroupItem extends BaseConfigItem {
    items: LoginItem[];
}
