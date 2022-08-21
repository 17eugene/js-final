function MultiplicatorUnitFailure(name, message) {
  this.name = name;
  this.message = message;
}

function primitiveMultiply(a, b) {
  let result = a * b;
  let value = Math.random();

  if (isNaN(result)) {
    throw new MultiplicatorUnitFailure("TypeError", "Invalid data!");
  } else if (value > 0.5) {
    throw new MultiplicatorUnitFailure(
      "Error",
      "Error while make random! The value is more than 0.5"
    );
  } else return result;
}

function reliableMultiply(a, b) {
  for (;;) {
    try {
      return primitiveMultiply(a, b);
    } catch (error) {
      if (error.name === "TypeError") {
        console.log(error.message);
        return;
      }

      console.log(error.message);
    }
  }
}

console.log(reliableMultiply("8", 5));
