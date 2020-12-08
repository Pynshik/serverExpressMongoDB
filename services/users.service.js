const fs = require('fs');
const { v4: uuid } = require('uuid');

class JSONusersService {
    usersFile = JSON.parse(fs.readFileSync('./users.json', 'utf8',
        function (err, data) {
            if (err) console.log(err);
            return (data);
        }))

    getAllUsers = () => {
        return this.usersFile;
    }

    getUser = (id) => {
        const user = this.usersFile.find(user => {
            return user.id === id;
        })
        return user;
    }

    addUser = (user) => {
        user.id = uuid();
        this.usersFile.push(user);
        fs.writeFile('./users.json', JSON.stringify(this.usersFile), function (err) {
            if (err) throw err;
        });
        return this.usersFile;
    }

    updateUser = (id, user) => {
        const found = this.usersFile.find(user => {
            return user.id === id;
        });
        if (!found) return false;

        const updated = {
            id: id,
            name: user.name,
            age: user.age
        }
        const targetIndex = this.usersFile.indexOf(found);
        this.usersFile.splice(targetIndex, 1, updated);

        fs.writeFile('./users.json', JSON.stringify(this.usersFile), function (err) {
            if (err) throw err;
        });

        return true;
    }

    deleteUser = (id) => {
        const found = this.usersFile.find(user => {
            return user.id === id
        });
        if (!found) return false;
        const targetIndex = this.usersFile.indexOf(found);
        this.usersFile.splice(targetIndex, 1);
        fs.writeFile('./users.json', JSON.stringify(this.usersFile), function (err) {
            if (err) throw err;
        });
        return true;
    }

}

module.exports = new JSONusersService();