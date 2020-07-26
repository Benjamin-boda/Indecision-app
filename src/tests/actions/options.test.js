import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import database from "../../firebase/firebase";
import { setOptions, startSetOption, addOption, startAddOption, removeOption, startRemoveOption, resetOption, startResetOption} from "../../actions/options";
import options from "../fixtures/options";

const uid = "123abc";
const defaultAuthState = { auth: {uid} };
const createMockStore = configureMockStore([ thunk ]);

beforeEach((done) => {
    database
        .ref(`users/${uid}/options`)
        .set(options)
        .then(() => done());
})

test("should start set options", () => {
    const action = setOptions(options);
    expect(action).toEqual({
        type: "SET_OPTIONS",
        options
    });
})

test('should add option', () => {
    const action = addOption(options[2]);
    expect(action).toEqual({
        type: "ADD_OPTION",
        option : options[2]
    });
});

test('should start add option', () => {
    const store = createMockStore(defaultAuthState);
    const value = "test item 4"

    store.dispatch(startAddOption(value)).then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: "ADD_OPTION",
            option: {
                id: expect.any(String),
                value
            }
        });

        return database.ref(`users/${uid}/options/${actions[0].value.id}`).once("value")
        }).then((snapshot) => {
            expect(snapshot.val()).toEqual(value);
            done();
    });
});

test('should remove option', () => {
    const action = removeOption({ id: "123abc" });
    expect(action).toEqual({
        type: "REMOVE_OPTION",
        id: "123abc"
    });
});

test('should start remove option', () => {
    const store = createMockStore(defaultAuthState);
    const id = options[2].id
    store.dispatch(startRemoveOption({ id })).then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: "REMOVE_OPTION",
            id
        });

        return database.ref(`users/${uid}/options/${id}`).once("value");
        }).then((snapshot) => {
            expect(snapshot.val()).toBeFalsy();
            done();
    });
});

test('should reset options', () => {
    const action = resetOption();
    expect(action).toEqual({
        type: "RESET_OPTION"
    });
});

test('should start reset options', () => {
    const store = createMockStore(defaultAuthState);
    store.dispatch(startResetOption()).then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: "RESET_OPTION"
        });

        return database.ref(`users/${uid}/options`).remove();
        }).then((snapshot) => {
            expect(snapshot.val()).toEqual();
            done();
    });
});

