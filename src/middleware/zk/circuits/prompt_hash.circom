pragma circom 2.0.0;

include "poseidon.circom";

template Main() {
    signal input prompt;
    signal input promptHash;

    component hasher = Poseidon(1);
    hasher.inputs[0] <== prompt;

    // ✅ Enforce equality between hasher.out and provided input
    hasher.out === promptHash;
}

component main = Main();
