Vue.component('section-01', {
    template: `<div id="section01" class="section">
    <h1>Section 1</h1>
  </div>`,
    mounted() {
        this.$el.addEventListener('wheel', this.handleScroll)
    },
    destroyed() {
        this.$el.removeEventListener('scroll', this.handleScroll)
    },
    methods: {
        handleScroll(event) {
            // first section
            if (event.wheelDelta.toString().indexOf('-') === 0) {
                this.$parent.nextSection(this.$el)
            }
        }
    }
})
Vue.component('section-02', {
    template: `<div id="section02" class="section">
    <h1>Section 2</h1>
  </div>`,
    mounted() {
        this.$el.addEventListener('wheel', this.handleScroll)
    },
    destroyed() {
        this.$el.removeEventListener('scroll', this.handleScroll)
    },
    methods: {
        handleScroll(event) {
            this.$parent.nextSection(this.$el)
        }
    }
})
Vue.component('section-03', {
    template: `<div id="section03" class="section">
    <h1>Section 3</h1>
  </div>`,
    mounted() {
        this.$el.addEventListener('wheel', this.handleScroll)
    },
    destroyed() {
        this.$el.removeEventListener('scroll', this.handleScroll)
    },
    methods: {
        handleScroll(event) {
            this.$parent.nextSection(this.$el)
        }
    }
})
Vue.component('section-04', {
    template: `<div id="section04" class="section">
    <h1>Section 4</h1>
  </div>`,
    mounted() {
        this.$el.addEventListener('wheel', this.handleScroll)
    },
    destroyed() {
        this.$el.removeEventListener('scroll', this.handleScroll)
    },
    methods: {
        handleScroll(event) {
            this.$parent.nextSection(this.$el)
        }
    }
})
Vue.component('nav-section', {
    template: `<nav id="navSection" class='nav-bar'> 
    <ul class='nav-menu'>
      <li v-for='(section, key) in sections' class='nav-item' v-bind:class="section.active ? 'active' : ''">
        <a :href="section.link" v-on:click="activeLink(key)" class='nav-link'>{{ section.name }}</a>
      </li>
    </ul>
  </nav>`,
    name: 'SectionNav',
    data() {
        return {
            sections: [{
                    'name': 'home',
                    'link': '#section01',
                    'active': true
                },
                {
                    'name': 'works',
                    'link': '#section02',
                    'active': false
                },
                {
                    'name': 'skills',
                    'link': '#section03',
                    'active': false
                },
                {
                    'name': 'contact',
                    'link': '#section04',
                    'active': false
                }
            ]
        }
    },
    methods: {
        activeLink(key) {
            for (var i = 0; i < this.sections.length; i++) {
                this.sections[i].active = false
            }
            this.sections[key].active = true
            this.$parent.nextSection(key)
        }
    }
})

var app = new Vue({
    el: '#app',
    methods: {
        nextSection: function (el) {

            let id = null
            if (isNaN(el)) {
                event.preventDefault()
                const delta = event.wheelDelta.toString()
                const scrollEl = delta.indexOf('-') === 0 ? el.nextElementSibling : el.previousElementSibling

                if (scrollEl) {
                    id = '#' + scrollEl.getAttribute('id')
                    const prevNavLinks = document.querySelector('.nav-item.active')
                    const nextLink = document.querySelector("[href*='" + id + "']")
                    // Component Nav 
                    if (prevNavLinks && nextLink) {
                        prevNavLinks.classList.remove('active')
                        nextLink.parentElement.classList.add('active')
                    }
                    if (delta.indexOf('-') === -1) {
                        el.setAttribute('style', 'transform:translateY(100vh)')
                    } else {
                        document.querySelector(id).setAttribute('style', 'transform:translateY(-100vh)')
                    }
                }
            } else {
                id = event.target.getAttribute('href')
                const sections = document.querySelectorAll('.section')
                for (let i = 0; i < sections.length; i++) {
                    if (i > el) {
                        sections[i].setAttribute('style', 'transform:translateY(100vh)')
                    }
                    if (el !== 0) {
                        document.querySelector(id).setAttribute('style', 'transform:translateY(-100vh)')
                    }
                }
            }
        }
    }
})