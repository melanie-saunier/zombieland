import ActivitiesPage from "@/app/activities/page";
import { render, screen, waitFor, fireEvent, cleanup } from "@testing-library/react";
import fetchAllCategories from "@/api/categories";
import { fetchAllActivities } from "@/api/activities";

// Mock des modules API
//on remplace les appels api/activities par ce mock
jest.mock("@/api/activities", () => ({
  // on imite la fct qui fect les activités, avec .fn() on pourra appeler notre mock et lui mettre des arguments
  fetchAllActivities: jest.fn(),
}));
//on remplace les appels api/categoried par ce mock
// categories est export default donc on precise ES6 et default, pareil que precedement .fn pourra appeler le mock et donner des arguments
jest.mock("@/api/categories", () => ({
  __esModule: true,
  default: jest.fn(),
}));

describe("ActivitiesPage integration", () => {
  const mockActivities = [
    {
      id: 1,
      name: "The Grinder",
      description: "Une machine à broyer…",
      duration: 5,
      min_height: 140,
      pregnancy_warning: true,
      image_ref: "the_grinder.png",
      category: { id: 1, name: "Frissons mécaniques", color: "#1BE7FF" },
      level: { id: 3, name: "Difficile", value: 3 }
    },
    {
      id: 2,
      name: "Infection Zero",
      description: "Explorez le laboratoire...",
      duration: 60,
      min_height: 0,
      pregnancy_warning: false,
      image_ref: "infection_zero.png",
      category: { id: 2, name: "Instinct de survie", color: "#C41E3A" },
      level: { id: 2, name: "Intermédiaire", value: 2 }
    }
  ];

  const mockCategories = [
    { id: 1, name: "Frissons mécaniques" },
    { id: 2, name: "Instinct de survie" }
  ];

  beforeEach(() => {
    // avant chaque test, on demonte les composants
    cleanup();
    // on rempli nos mocks de actvities et catgeories avec nos fausses données
    (fetchAllActivities as jest.Mock).mockResolvedValue(mockActivities);
    (fetchAllCategories as jest.Mock).mockResolvedValue(mockCategories);
  });

  it("displays activities and categories after fetching", async () => {
    render(<ActivitiesPage />);

    // On attend que les activités soient chargées
    await waitFor(() => {
      expect(screen.getByText(/The Grinder/i)).toBeInTheDocument();
      expect(screen.getByText(/Infection Zero/i)).toBeInTheDocument();
      // Vérifier l'option dans le select
      expect(screen.getByRole("option", { name: "Frissons mécaniques" })).toBeInTheDocument();
      expect(screen.getByRole("option", { name: "Instinct de survie" })).toBeInTheDocument();

      // Vérifier la catégorie dans la card
      expect(screen.getByText("Frissons mécaniques", { selector: "span" })).toBeInTheDocument();

    });
  });
  it("filters activities by category", async () => {
    render(<ActivitiesPage />);

    await waitFor(() => {
      expect(screen.getByText(/The Grinder/i)).toBeInTheDocument();
    });
    // on recup le select
    const select = screen.getByRole("combobox");
    // on selectionne frissons mécaniques
    fireEvent.change(select, { target: { value: "Frissons mécaniques" } });
    // on doit recup the grinder et pas infection zero
    expect(screen.getByText(/The Grinder/i)).toBeInTheDocument();
    expect(screen.queryByText(/Infection Zero/i)).toBeNull();
  });

  it("filters activities by search term", async () => {
    render(<ActivitiesPage />);

    await waitFor(() => {
      expect(screen.getByText(/The Grinder/i)).toBeInTheDocument();
    });
    // on recup l'input de search et on met Infection dedans
    const input = screen.getByPlaceholderText(/rechercher par mot clé/i);
    fireEvent.change(input, { target: { value: "Infection" } });
    // on doit recupérer uniquement Infection zero et pas the grinder
    expect(screen.getByText(/Infection Zero/i)).toBeInTheDocument();
    expect(screen.queryByText(/The Grinder/i)).toBeNull();
  });

});
