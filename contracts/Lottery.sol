// SPDX-License-Identifier: MIT

pragma solidity >=0.7.0 <0.9.0;

contract Lottery {
    address public manager;
    address payable[] public players;
    address payable public winner;

    constructor() {
        manager = msg.sender; //global  variable
    }

    receive() external payable {
        require(msg.value == 0.01 ether);
        players.push(payable(msg.sender));
    }

    function balance() public view returns (uint) {
        require(msg.sender == manager, "You are not the manager");
        return address(this).balance;
    }

    //to generate random key
    function generate() public view returns (uint) {
        return
            uint(
                keccak256(
                    abi.encodePacked(
                        block.prevrandao,
                        block.timestamp,
                        players.length
                    )
                )
            );
    }

    function SelectWinner() public {
        require(msg.sender == manager, "You are not the manager");
        require(players.length >= 3, "Players must be 3");
        uint r = generate();
        uint index = r % players.length;
        winner = players[index];
        winner.transfer(0.03 ether);
        players = new address payable[](0);
    }

    function allPlayers() public view returns (address payable[] memory) {
        return players;
    }
}
