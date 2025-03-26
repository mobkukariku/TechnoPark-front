export const useContactLink = () => {
    return (type: string, value: string) => {
        switch (type) {
            case "PHONE":
                return `tel:${value}`;
            case "TELEGRAM":
                return `https://t.me/${value.replace("@", "")}`;
            case "LINKEDIN":
                return `${value}`;
            case "GITHUB":
                return `${value}`;
            case "EMAIL":
                return `mailto:${value}`;
            default:
                return value;
        }
    };
};
