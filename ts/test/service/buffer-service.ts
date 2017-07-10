import { assert } from "chai";
import { suite, test } from "mocha-typescript";
import { BufferService } from '../../main/service/buffer-service';

@suite class BufferServiceSuite {

    @test public "register callback"() {
        let callbackCounter = 0;
        let myCallback = (elements) => {
            callbackCounter++;
        }

        let buffer = new BufferService(5)
        buffer.registerCallbackFlushingBuffer(myCallback)
        buffer.add(1)
        buffer.add(2)
        buffer.add(3)
        buffer.add(4)
        buffer.add(5)
        buffer.add(6)
        buffer.add(7)

        assert.equal(1, callbackCounter)
    }

    @test public "register two callbacks"() {
        let callbackCounter = 0;
        let callbackCounter2 = 0;
        let myCallback = (elements) => {
            callbackCounter++;
        }
        let mySecondCallback = (elements) => {
            callbackCounter2++;
        }

        let buffer = new BufferService(5)
        buffer.registerCallbackFlushingBuffer(myCallback)
        buffer.registerCallbackFlushingBuffer(mySecondCallback)
        buffer.add(1)
        buffer.add(2)
        buffer.add(3)
        buffer.add(4)
        buffer.add(5)
        buffer.add(6)
        buffer.add(7)

        assert.equal(1, callbackCounter)
        assert.equal(1, callbackCounter2)
    }

    @test public "register multi flushing"() {
        let callbackCounter = 0;
        let myCallback = (elements) => {
            callbackCounter++;
        }

        let buffer = new BufferService(5)
        buffer.registerCallbackFlushingBuffer(myCallback)
        buffer.add(1)
        buffer.add(2)
        buffer.add(3)
        buffer.add(4)
        buffer.add(5)
        buffer.add(6)
        buffer.add(7)
        buffer.add(8)
        buffer.add(9)
        buffer.add(10)
        buffer.add(11)
        buffer.add(12)
        buffer.add(13)
        buffer.add(14)
        buffer.add(15)
        buffer.add(16)
        buffer.add(17)

        assert.equal(3, callbackCounter)
    }
}