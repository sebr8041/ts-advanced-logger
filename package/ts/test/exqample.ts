import "source-map-support/register";

import { assert } from "chai";
import { suite, test } from "mocha-typescript";


@suite class ExampleSuite {
    @test public "compute True && False"() {
      assert.equal(true, true);
    }

    
}
