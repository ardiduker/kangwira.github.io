function displayToCByMonth(data) {
    const posts = data.feed.entry;
    const tocContainer = document.getElementById("toc");
    const postsByMonth = {};

    // Mengelompokkan postingan berdasarkan bulan
    posts.forEach(post => {
        const date = new Date(post.published.$t);
        const monthYear = date.toLocaleString('id-ID', { month: 'long', year: 'numeric' }); // Ubah locale ke 'id-ID'

        if (!postsByMonth[monthYear]) {
            postsByMonth[monthYear] = [];
        }

        // Hanya menampilkan tanggal dan bulan
        const options = { day: 'numeric', month: 'long' };
        const publishedDate = date.toLocaleDateString('id-ID', options);

        postsByMonth[monthYear].push({
            title: post.title.$t,
            url: post.link.find(link => link.rel === "alternate").href,
            publishedDate: publishedDate // Menggunakan format baru
        });
    });

    // Membuat accordion untuk setiap bulan
    Object.entries(postsByMonth).forEach(([monthYear, posts], index) => {
        const monthButton = document.createElement("button");
        monthButton.classList.add("toc-kw-acc-bulan");
        monthButton.textContent = monthYear; // Menggunakan nama bulan dalam bahasa Indonesia

        const contentDiv = document.createElement("div");
        contentDiv.classList.add("toc-kw-acc-content");

        const ul = document.createElement("ul");
        posts.forEach(post => {
            const li = document.createElement("li");
            
            // Membuat div untuk informasi postingan
            const postInfo = document.createElement("div");
            postInfo.classList.add("post-info");

            // Tanggal postingan
            const dateSpan = document.createElement("span");
            dateSpan.classList.add("post-date");
            dateSpan.textContent = post.publishedDate; // Tetap menggunakan format tanggal yang sama
            postInfo.appendChild(dateSpan);

            // Judul postingan
            const titleSpan = document.createElement("span");
            titleSpan.classList.add("post-title");
            const a = document.createElement("a");
            a.href = post.url;
            a.textContent = post.title; // Menampilkan judul
            titleSpan.appendChild(a); // Menambahkan link ke titleSpan
            postInfo.appendChild(titleSpan); // Tambahkan titleSpan ke postInfo

            li.appendChild(postInfo); // Tambahkan postInfo ke li
            ul.appendChild(li);
        });

        contentDiv.appendChild(ul);
        tocContainer.appendChild(monthButton);
        tocContainer.appendChild(contentDiv);

        // Tambahkan event listener untuk membuka/tutup accordion
        monthButton.addEventListener("click", function() {
            this.classList.toggle("active");
            const content = this.nextElementSibling;
            content.classList.toggle("show");

            if (content.classList.contains("show")) {
                content.style.maxHeight = content.scrollHeight + "px"; // Set max-height saat dibuka
            } else {
                content.style.maxHeight = "0"; // Set max-height saat ditutup
            }
        });

        // Buka accordion teratas secara default
        if (index === 0) {
            monthButton.click(); // Simulasikan klik untuk membuka yang pertama
        }
    });
}

fetchBlogPosts();
