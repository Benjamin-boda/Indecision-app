import { startLogin, login, startLogout, logout} from "../../actions/auth";

test("should setup login in action object", () => {
    const action = login("benjamin");
    expect(action).toEqual({
        type: "LOGIN",
        uid: "benjamin"
    });
});

test("should call firebase login", () => {
    const call = startLogin();
    expect(call).toEqual(expect.any(Function));
});

test("should setup logout in action object", () => {
    const action = logout();
    expect(action).toEqual({
        type: "LOGOUT"
    });
});

test("should call firebase logout", () => {
    const call = startLogout();
    expect(call).toEqual(expect.any(Function));
});