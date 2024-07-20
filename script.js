document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const category = urlParams.get('category');
    const entryName = urlParams.get('name');

    if (category) {
        loadCategory(category);
    } else if (entryName) {
        loadEntry(entryName);
    }

    function loadCategory(category) {
        document.getElementById('category-title').innerText = category + 's';
        fetch('data.json')
            .then(response => response.json())
            .then(data => {
                const entries = data.entries.filter(entry => entry.Category.toLowerCase() === category.toLowerCase());
                const entryList = document.getElementById('entry-list');
                entries.forEach(entry => {
                    const a = document.createElement('a');
                    a.classList.add('list-group-item', 'list-group-item-action');
                    a.href = `entry.html?name=${encodeURIComponent(entry.Name)}`;
                    a.textContent = entry.Name;
                    entryList.appendChild(a);
                });
            });
    }

    function loadEntry(name) {
        fetch('data.json')
            .then(response => response.json())
            .then(data => {
                const entry = data.entries.find(entry => entry.Name === name);
                document.getElementById('entry-name').innerText = entry.Name;
                document.getElementById('entry-image').src = entry.Image;
                entry.Description.forEach(desc => {
                    const li = document.createElement('li');
                    li.textContent = desc;
                    document.getElementById('entry-description').appendChild(li);
                });
                entry.Mechanics.forEach(mech => {
                    const li = document.createElement('li');
                    li.textContent = mech;
                    document.getElementById('entry-mechanics').appendChild(li);
                });
            });
    }
});
