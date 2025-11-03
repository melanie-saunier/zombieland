import { render, screen } from "@testing-library/react";
import CardActivity from "@/components/CardActivity";

const mockActivity = {
  id: 1,
  name: "The grinder",
  description: "Les visiteurs embarquent dans une machine à broyer les morts-vivants : nacelles rotatives, étincelles de métal, néons roses et verts, cris mécaniques et rires zombifiés en fond sonore. Sensations garanties !",
  duration: 5,
  min_height: 140,
  pregnancy_warning: true,
  image_ref: "the_grinder.png",
  category: { id: 1, name: "Frissons mécaniques", color: "#1BE7FF" },
  level: { id: 3, name: "Difficile", value: 3 }
};

describe("CardActivity", () => {
  it("Display the name of the activity", () => {
    render(<CardActivity activity={mockActivity} />);
    expect(screen.getByText(/The Grinder/i)).toBeInTheDocument();
  });
});