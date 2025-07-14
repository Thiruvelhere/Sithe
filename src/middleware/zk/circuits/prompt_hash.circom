pragma circom 2.0.0;

include "poseidon.circom";

template Main() {
    signal input prompt;
    signal output promptHash; // ✅ Make promptHash an output

    component hasher = Poseidon(1);
    hasher.inputs[0] <== prompt;

    promptHash <== hasher.out; // ✅ assign output, not constrain input
}

component main = Main();
