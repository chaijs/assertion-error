/*!
 * Include lib
 */

import { AssertionError, AssertionResult } from "./mod.ts";
import { assert } from "https://deno.land/std@0.112.0/testing/asserts.ts";
const { test } = Deno;

test("AssertionError construction", () => {
  const err = new AssertionError();
  assert(err instanceof Error, "instanceof Error");
  assert(err instanceof AssertionError, "instanceof AssertionError");
  assert(
    err.name && err.name === "AssertionError",
    'name === "AssertionError"',
  );
  assert(err.ok === false, "has ok=false prop");
});

test("AssertionError message", () => {
  const err = new AssertionError("Oops."),
    empty = new AssertionError();
  assert(err.message === "Oops.", "w/ err.message");
  assert(empty.message === "Unspecified AssertionError", "w/o err.message");
});

test("AssertionError stack", function () {
  assert(typeof new AssertionError().stack === "string");
});

test("AssertionError stack elides ssf if provided", function () {
  function foo() {
    function bar() {
      throw new AssertionError("error", {}, foo)
    }
    bar()
  }
  try {
    foo()
  } catch (e) {
    assert(e.stack.includes("foo") === false)
  }
});


test("AssertionError custom properties", () => {
  const err = new AssertionError("good message", {
    name: "ShouldNotExist",
    ok: true,
    hello: "universe",
    message: "bad message",
    stack: "custom stack",
  });

  assert(err.name === "AssertionError", "does not overwrite name");
  assert(err.ok === false, "does not overwrite ok");
  assert(err.message === "good message", "does not overwrite message");
  assert(err.hello && err.hello === "universe", "has custom property");

  // some browsers don't have stack
  if (err.stack) {
    assert(
      err.stack && err.stack !== "custom stack",
      "does not overwrite stack",
    );
  }
});

test("AssertionError .toJSON()", () => {
  const err = new AssertionError("some message", {
    hello: "universe",
    goodbye: "known",
  });

  const json = err.toJSON();

  assert(json.name === "AssertionError", "json has name");
  assert(json.ok === false, "json has ok");
  assert(json.message === "some message", "json has message");
  assert(
    json.hello === "universe" && json.goodbye === "known",
    "json has custom properties",
  );

  // some browsers don't have stack
  if (err.stack) {
    assert("string" === typeof json.stack, "json has stack");
  }

  const nostack = err.toJSON(false);
  assert(!nostack.stack, "no stack on false argument");
});

test("AssertionResult construction", () => {
  const res = new AssertionResult();
  assert(res instanceof Error === false, "not instanceof Error");
  assert(res instanceof AssertionResult, "instanceof AssertionResult");
  assert(
    res.name && res.name === "AssertionResult",
    'name === "AssertionResult"',
  );
  assert(res.ok === true, "has ok=true prop");
});

test("AssertionResult message", () => {
  const res = new AssertionResult("Oops.");
  assert("message" in res === false, "has no message prop");
});

test("AssertionResult stack", function () {
  const res = new AssertionResult();
  assert("stack" in res === false, "has no stack");
});

test("AssertionResult custom properties", () => {
  const res = new AssertionResult({
    name: "ShouldNotExist",
    ok: false,
    hello: "universe",
    message: "good message",
    stack: "custom stack",
  });

  assert(res.name === "AssertionResult", "does not overwrite name");
  assert(res.ok === true, "does not overwrite ok property");
  assert(res.message === "good message", "can overwrite message");
  assert(res.hello && res.hello === "universe", "has custom property");
  assert(res.stack && res.stack === "custom stack", "can overwrite stack");
});

test("AssertionResult .toJSON()", () => {
  const res = new AssertionResult({
    hello: "universe",
    goodbye: "known",
  });

  const json = res.toJSON();

  assert(json.name === "AssertionResult", "json has name");
  assert(json.ok === true, "json has ok");
  assert(
    json.hello === "universe" && json.goodbye === "known",
    "json has custom properties",
  );
});
