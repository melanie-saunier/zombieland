import { IUser } from "@/@types/user";
import { authApi } from "@/api/auth";
import { csrfApi } from "@/api/csrf";
import UserContext, { IUserContext } from "@/context/userContext";
import UserContextProvider from "@/context/userContextProvider";
import { render, waitFor } from "@testing-library/react";

describe("UserContext", () => {
  // on vérifie que le context est initialisé correctement:
  // user est null et logged: false
  it("has initial values", () => {
    let contextValue: IUserContext;

    render(
      // on simule une app réelle ou le context englobe tout
      <UserContextProvider>
        {/*  consumer permet d'accèder au valeurs du context */}
        <UserContext.Consumer>
          {value => {
            if (!value) throw new Error("UserContext not found");
            // on met les valeurs du context dans contextValue 
            contextValue = value;
            return null;
          }}
        </UserContext.Consumer>
      </UserContextProvider>
    );

    expect(contextValue!.user).toBeNull();
    expect(contextValue!.logged).toBe(false);
  });
  // vérification de login
  it("updates context when login is called", async () => {
    let contextValue!: IUserContext;
    // on crée un faux user
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
          {value => {
            if (!value) throw new Error("UserContext not found");
            contextValue = value;
            return null;
          }}
        </UserContext.Consumer>
      </UserContextProvider>
    );
    //vérification du state initial
    expect(contextValue!.user).toBeNull();
    expect(contextValue!.logged).toBe(false);
  
    // Appel de login
    contextValue.login(mockUser);
  
    // Vérifie que le contexte a été mis à jour , il faut await la mise à jour
    await waitFor(() => {
      expect(contextValue!.user).toEqual(mockUser);
      expect(contextValue!.logged).toBe(true);
    });

    // simule le logout
    await contextValue!.logout();
    //on vérifie le retour du state à l'initial
    await waitFor(() => {
      expect(contextValue!.user).toBeNull();
      expect(contextValue!.logged).toBe(false);
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
  //gestion des erreurs dans le useEffect du context
  //si il y a une erreur dans le fetch pour avoir le token csrf ou le currentUser : user reste null et logged à false
  describe("UserContext - error handling", () => {
    it("handles API errors gracefully", async () => {
      let contextValue!: IUserContext;
  
      // on simule que les appels API échouent
      jest.spyOn(csrfApi, "getCsrfToken").mockRejectedValue(new Error("CSRF error"));
      jest.spyOn(authApi, "getCurrentUser").mockRejectedValue(new Error("Auth error"));
  
      render(
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
  
      await waitFor(() => {
        // Le contexte doit rester dans l'état initial user null et logged false et csrfToken null
        expect(contextValue.user).toBeNull();
        expect(contextValue.logged).toBe(false);
        expect(contextValue.csrfToken).toBeNull();
      });
    });
  });
});