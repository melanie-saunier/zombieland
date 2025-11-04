import { render, waitFor, act, cleanup } from "@testing-library/react";
import UserContextProvider from "@/context/userContextProvider";
import UserContext, { IUserContext } from "@/context/userContext";
import { IUser } from "@/@types/user";
import { csrfApi } from "@/api/csrf";
import { authApi } from "@/api/auth";

jest.mock("@/api/csrf", () => ({
  csrfApi: { getCsrfToken: jest.fn().mockResolvedValue("mocked-csrf-token") },
}));

jest.mock("@/api/auth", () => ({
  authApi: {
    getCurrentUser: jest.fn().mockResolvedValue(null),
    logout: jest.fn().mockResolvedValue(undefined),
  },
}));

describe("UserContextProvider", () => {
  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
  });

  it("has initial values", async () => {
    let contextValue!: IUserContext;

    render(
      <UserContextProvider>
        <UserContext.Consumer>
          {(value) => {
            contextValue = value!;
            return null;
          }}
        </UserContext.Consumer>
      </UserContextProvider>
    );

    // attendre que le useEffect initial ait fini
    await waitFor(() => {
      expect(contextValue.user).toBeNull();
      expect(contextValue.logged).toBe(false);
    });
  });

  it("updates context correctly on login and logout", async () => {
    let contextValue!: IUserContext;
    const mockUser: IUser = {
      id: 1,
      firstname: "John",
      lastname: "Doe",
      email: "john@example.com",
      role: "user",
    };

    render(
      <UserContextProvider>
        <UserContext.Consumer>
          {(value) => {
            contextValue = value!;
            return null;
          }}
        </UserContext.Consumer>
      </UserContextProvider>
    );

    // attendre que le useEffect initial ait fini
    await waitFor(() => {
      expect(contextValue.user).toBeNull();
      expect(contextValue.logged).toBe(false);
    });

    // login
    await act(async () => {
      contextValue.login(mockUser);
    });

    await waitFor(() => {
      expect(contextValue.user).toEqual(mockUser);
      expect(contextValue.logged).toBe(true);
    });

    // logout
    await act(async () => {
      await contextValue.logout();
    });

    await waitFor(() => {
      expect(contextValue.user).toBeNull();
      expect(contextValue.logged).toBe(false);
    });
  });
  // vérification de la récupération du token csrf
  it("fetches and stores csrfToken on mount", async () => {
    let contextValue!: IUserContext;

    // On peut mocker la récupération du token pour le test 
    //on simule que l'API renvoie un token comme ça on dépend pas du back
    const mockCsrfToken = "mocked-csrf-token";
    jest.spyOn(csrfApi, "getCsrfToken").mockResolvedValue(mockCsrfToken);

    render(
      // on monte le context et englobe l'app
      <UserContextProvider>
        <UserContext.Consumer>
          {value => {
            if (!value) throw new Error("UserContext not found");
            contextValue = value;
            return null;
          }}
        </UserContext.Consumer>
      </UserContextProvider>
    );

    // On attend que le token soit défini et mis à jour
    await waitFor(() => {
      expect(contextValue.csrfToken).toBe(mockCsrfToken);
    });
  });
 
});

//gestion des erreurs dans le useEffect du context
//si il y a une erreur dans le fetch pour avoir le token csrf ou le currentUser : user reste null et logged à false
describe("UserContext - error handling", () => {
  it("handles API errors gracefully", async () => {
    let contextValue!: IUserContext;

    // on simule que les appels API échouent
    jest.spyOn(csrfApi, "getCsrfToken").mockRejectedValue(new Error("CSRF error"));
    jest.spyOn(authApi, "getCurrentUser").mockRejectedValue(new Error("Auth error"));

    // Wrap render in act
    await act(async () => {
      render(
        <UserContextProvider>
          <UserContext.Consumer>
            {(value) => {
              contextValue = value!;
              return null;
            }}
          </UserContext.Consumer>
        </UserContextProvider>
      );
    });

    await waitFor(() => {
      // Le contexte doit rester dans l'état initial
      expect(contextValue.user).toBeNull();
      expect(contextValue.logged).toBe(false);
      expect(contextValue.csrfToken).toBeNull();
    });
  });
});
