// SPDX-License-Identifier: MIT

pragma solidity >=0.7.0 <0.9.0;

contract Lottery {
    address public manager;
    address payable[] public participants;

    constructor() {
        manager = msg.sender; //global  variable
    }

    receive() external payable {
        require(msg.value == 0.01 ether);
        participants.push(payable(msg.sender));
    }

    function balance() public view returns (uint) {
        require(msg.sender == manager);
        return address(this).balance;
    }

    //to generate random key
    function generate() private view returns (uint) {
        return
            uint(keccak256(
                    abi.encodePacked(
                        block.prevrandao,
                        block.timestamp,
                        participants.length
                    )
                )
            );
    }

    function SelectWinner() public {
        require(msg.sender == manager);
        require(participants.length >= 3);
        address payable winner;
        uint r = generate();
        uint index = r % participants.length;
        winner = participants[index];
        winner.transfer(0.05 ether);
        participants = new address payable[](0);
    }
}
