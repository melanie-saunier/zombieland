import { screen, render } from "@testing-library/react";
import renderSkulls from "@/components/RenderSkulls";

// on fait un mock de l'icone Skull de lucide react 
// on dit qu'il faut utiliser ce mock au lieu de lucidereact dans ce test
jest.mock("lucide-react", () => ({
  Skull: ({ color, size }: { color: string; size?: number }) => (
    <span data-color={color} data-size={size}>Skull</span>
  ),
}));

describe("renderSkulls", () => {
  it("display 3 skulls with the correct color accordinf to levelValue", () => {
    render(renderSkulls(2)); // renderSkulls utilise maintenant le Skull mocké

    const skulls = screen.getAllByText("Skull");
    // on vérfie qu'il y a 3 skull
    expect(skulls).toHaveLength(3);
    // et on vérifie la couleur 2 en 200 et 1 en 500
    expect(skulls[0]).toHaveAttribute("data-color", "var(--color-secondary-200)");
    expect(skulls[1]).toHaveAttribute("data-color", "var(--color-secondary-200)");
    expect(skulls[2]).toHaveAttribute("data-color", "var(--color-secondary-500)");
  });

});