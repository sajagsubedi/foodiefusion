import Wrapper from "./Wrapper";
import StyledComponentsRegistry from "./registry.js";

export const metadata = {
    title: "Foodie Fusion",
    description:
        "Discover culinary excellence at Foodie Fusion - your recipe haven. Sort through a diverse array of dishes based on diet, cuisine, and meal type. Unleash your inner chef and explore a world of delightful flavors!"
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body>
                <StyledComponentsRegistry>
                    <Wrapper>{children}</Wrapper>
                </StyledComponentsRegistry>
            </body>
        </html>
    );
}
