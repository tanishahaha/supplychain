// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

contract Tracking{
  enum Shipmentstatus{PENDING, IN_TRANSIT, DELIVERED}

  struct Shipment {
    address sender;
    address receiver;
    uint256 pickuptime;
    uint256 deliverytime;
    uint256 distance;
    uint256 price;
    Shipmentstatus status;
    bool isPaid;
  }

  mapping (address => Shipment[]) public shipments;
  uint256 public shipmentcount;

  struct Typeshipment{
    address sender;
    address receiver;
    uint256 pickuptime;
    uint256 deliverytime;
    uint256 distance;
    uint256 price;
    Shipmentstatus status;
    bool isPaid;
  }

  Typeshipment[] Typeshipments;

  event Shipmentcreated(address indexed sender,address indexed receiver, uint256 pickuptime,uint256 distance,uint256 price);
  event Shipmentintransit(address indexed sender,address indexed receiver, uint256 pickuptime);
  event Shipmentdelivered(address indexed sender,address indexed receiver, uint256 deliverytime);
  event Shipmentpaid(address indexed sender,address indexed receiver, uint256 amount);

  constructor(){
    shipmentcount=0;

  }

  function createshipment(address _receiver,uint256 _pickuptime,uint256 _distance,uint256 _price) public payable{
    require(msg.value==_price,"Payment amount must match the price");

    Shipment memory shipment=Shipment(msg.sender,_receiver,_pickuptime,0,_distance,_price,Shipmentstatus.PENDING,false);

    shipments[msg.sender].push(shipment);
    shipmentcount++;

    Typeshipments.push(
      Typeshipment(
        msg.sender,
        _receiver,
        _pickuptime,
        0,
        _distance,
        _price,
        Shipmentstatus.PENDING,
        false
      )
    );

    emit Shipmentcreated(msg.sender,_receiver,_pickuptime,_distance,_price);
  }

  function startshipment(address _sender,address _receiver,uint256 _index) public{
    Shipment storage shipment=shipments[_sender][_index];
    Typeshipment storage typeshipment=Typeshipments[_index];

    require(shipment.receiver==_receiver,"invalid receiver");
    require(shipment.status==Shipmentstatus.PENDING,"shipment is already in transit");

    shipment.status=Shipmentstatus.IN_TRANSIT;
    typeshipment.status=Shipmentstatus.IN_TRANSIT;

    emit Shipmentintransit(_sender,_receiver,shipment.pickuptime);
  }

  function completeshipment(address _sender,address _receiver,uint256 _index) public{
    Shipment storage shipment=shipments[_sender][_index];
    Typeshipment storage typeshipment=Typeshipments[_index];
    require(shipment.receiver==_receiver,"Invalid receiver");
    require(shipment.status==Shipmentstatus.IN_TRANSIT,"shipment not in transit");
    require(!shipment.isPaid,"shipment already paid");

    shipment.status=Shipmentstatus.DELIVERED;
    typeshipment.status=Shipmentstatus.DELIVERED;
    typeshipment.deliverytime=block.timestamp;
    shipment.deliverytime=block.timestamp;

    uint256 amount =shipment.price;

    payable(shipment.sender).transfer(amount);

    shipment.isPaid=true;
    typeshipment.isPaid=true;

    emit Shipmentdelivered(_sender,_receiver,shipment.deliverytime);
    emit Shipmentpaid(_sender,_receiver,amount);
  }

  function getshipment(address _sender,uint256 _index) public view returns(address,address,uint256,uint256,uint256,uint256,Shipmentstatus,bool){
    Shipment memory shipment=shipments[_sender][_index];
    return(shipment.sender,shipment.receiver,shipment.pickuptime,shipment.deliverytime,shipment.distance,shipment.price,shipment.status,shipment.isPaid);
  }

  function getshipmentscount(address _sender) public view returns(uint256){
    return shipments[_sender].length;
  }

  function getalltransactions() public view returns(Typeshipment[] memory){
    return Typeshipments;
  }
}