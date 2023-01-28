class Developer {
            constructor(name, experience, domains) {
                this.name = name
                this.experience = experience
                this.domains = domains
            }
            toJson() {
                return JSON.stringify(dev1)
            }            

            fromJson(json) {
                let info = JSON.parse(json)
                this.name = info.name
                this.experience = info.experience
                this.domains = info.domains
            }
        }

        let dev1 = new Developer('John Doe', 10, ['JS', 'CSS'])
        let dev2 = new Developer()
        let json = dev1.toJson()
        console.log(json)

        dev2.fromJson(json)
        console.log(dev2)