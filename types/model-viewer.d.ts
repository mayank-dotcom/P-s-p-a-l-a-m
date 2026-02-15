declare namespace JSX {
    interface IntrinsicElements {
        'model-viewer': React.DetailedHTMLProps<
            React.HTMLAttributes<HTMLElement> & {
                src?: string;
                alt?: string;
                'camera-controls'?: boolean;
                'disable-zoom'?: boolean;
                'disable-pan'?: boolean;
                'camera-orbit'?: string;
                'auto-rotate'?: boolean;
                'interaction-prompt'?: string;
                style?: React.CSSProperties;
            },
            HTMLElement
        >;
    }
}

export { };
