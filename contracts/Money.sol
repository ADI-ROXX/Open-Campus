// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Money {


    struct addr_money{
        address _addr;
        int256 _amount ;
    }

    struct User{
        string name;
    }

    mapping(address => mapping(address => int256)) public  owes;
    mapping(address=>string) private users;
    mapping(address=>address[]) private friends_list ;
    mapping(string=>bool) private userExists;
    constructor(){
    owes[0xFaE159D1b5BBe1b083404cA11F85221c7177C434][0xd107209F135e3c3F49b040bCC1fa4682235B20aA]=0.0005*1e18;
    owes[0xd107209F135e3c3F49b040bCC1fa4682235B20aA][0xFaE159D1b5BBe1b083404cA11F85221c7177C434]=-0.0005*1e18;
    
    owes[0xd107209F135e3c3F49b040bCC1fa4682235B20aA][0x89A28C83fA3f1592d80553240e2a4c2F30986fEF]=0.0005*1e18;
    owes[0x89A28C83fA3f1592d80553240e2a4c2F30986fEF][0xd107209F135e3c3F49b040bCC1fa4682235B20aA]=-0.0005*1e18;
    
    users[0xFaE159D1b5BBe1b083404cA11F85221c7177C434]="Aditya";
    users[0xd107209F135e3c3F49b040bCC1fa4682235B20aA]="Biswa";
    users[0x89A28C83fA3f1592d80553240e2a4c2F30986fEF]="Sahu";

    userExists["Aditya"]=true;
    userExists["Sahu"]=true;
    userExists["Biswa"]=true;
    friends_list[0xFaE159D1b5BBe1b083404cA11F85221c7177C434].push(0xd107209F135e3c3F49b040bCC1fa4682235B20aA);
    friends_list[0xd107209F135e3c3F49b040bCC1fa4682235B20aA].push(0xFaE159D1b5BBe1b083404cA11F85221c7177C434);
    friends_list[0xFaE159D1b5BBe1b083404cA11F85221c7177C434].push(0x89A28C83fA3f1592d80553240e2a4c2F30986fEF);
    friends_list[0x89A28C83fA3f1592d80553240e2a4c2F30986fEF].push(0xFaE159D1b5BBe1b083404cA11F85221c7177C434);
    friends_list[0x89A28C83fA3f1592d80553240e2a4c2F30986fEF].push(0xd107209F135e3c3F49b040bCC1fa4682235B20aA);
    friends_list[0xd107209F135e3c3F49b040bCC1fa4682235B20aA].push(0x89A28C83fA3f1592d80553240e2a4c2F30986fEF);



    }

    function addFriend(address friend) external returns (string memory){
        require(friend != msg.sender, "Yourself");
        require(bytes(users[friend]).length>0,"User does not exist");
        address[] storage friendList = friends_list[msg.sender];
        // Check if the friend is already in the list
        for (uint256 i = 0; i < friendList.length; i++) {
            if (friendList[i] == friend) {
                return "Already"; // Friend already exists, no need to add
            }
        }
        // Add the friend to the list
        friendList.push(friend);
        return "Added";
    }

    function getFriends_helper() public view returns (address[] memory) {
        return friends_list[msg.sender];
    }


    function getFriends() public view returns (address[] memory,string[] memory,int256[] memory) {
        address[] memory friendsAddr=friends_list[msg.sender];
        string[] memory names = new string[](friendsAddr.length);
        int256[] memory amounts = new int[](friendsAddr.length);

        for(uint256 i=0;i<friendsAddr.length;i++){
            names[i]=users[friendsAddr[i]];
            amounts[i]=owes[msg.sender][friendsAddr[i]];
        }
        return (friendsAddr,names,amounts);
    }

    function createUser(string memory name) public returns(string memory){
        if(bytes(name).length==0) return "EmptyName";

        if(bytes(users[msg.sender]).length>0){
            return "Already";
        }
        else{
            if(userExists[name]==true){
                return "Duplicate";
            }
            else{
                userExists[name]=true;
                users[msg.sender]=name;
            }
            
        }
        return "Created";
    }

    function checkIfExists() external view returns(bool){
        return bytes(users[msg.sender]).length>0;
    }


    function simpleReturn(address[] memory friends,address me) public view returns(addr_money[] memory){
        addr_money[] memory out;
        uint j=0;
        for(uint256 i=0;i<friends.length;i++){
            if (friends[i]==me){
                continue ;
            }
            int256 sum =0;
            sum-=int256(owes[me][friends[i]]);
            sum+=int256(owes[friends[i]][me]);
            if(sum<0){
                out[j++]=addr_money({_addr:friends[i],_amount:-1*sum});
            }
        }
        return out;
    }

    function oneToOneReturn(address other, address me) public returns(int256){
        int256 ans=owes[other][me];
        ans-=owes[me][other];
        if(ans>0){
            owes[other][me]=0;
            owes[me][other]=0;
            return ans;
        }
        return 0;
    }
event RelationData(int256[] data);

    function getRelation(address[] memory friends) public{
        int256[] memory dynamicArray = new int256[](friends.length);
        for (uint i = 0; i < friends.length; i++) {
            int256 sum=0;
            for(uint j=0;j<friends.length;j++){
                if(j==i){
                    continue ;
                }
                sum-=int256(owes[friends[j]][friends[i]]);
                owes[friends[j]][friends[i]]=0;
            }
            dynamicArray[i]=sum;
        }
     
        emit RelationData(dynamicArray);
    }

    


    function getOwes(address _user, address _owesTo) public view returns (int256) {
        return owes[_user][_owesTo];
    }




    function sendMoney(address payable _to) external payable {
        require(msg.value > 0, "No Ether sent.");
        (bool sent, ) = _to.call{value: msg.value}("");
        require(sent, "Failed to send Ether.");
        owes[_to][msg.sender] += int256(msg.value);
        owes[msg.sender][_to] -=int256(msg.value);
    }
    function checkOwes(address _debtor, address _creditor) external view returns (int256) {
        return owes[_debtor][_creditor];
    }
}
