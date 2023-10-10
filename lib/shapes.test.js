const { Triangle, Square, Circle } = require("./shapes.js")

describe("triangle", () => {
    test("tests for a red triangle", () => {
        const shape = new Triangle();
        shape.setColor("red")
        expect(shape.render()).toEqual(
            '<polygon points="150, 18 244, 182 56, 182" fill="red" />'
        )
    })
})