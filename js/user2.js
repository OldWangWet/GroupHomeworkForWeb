(function () {
    let md5id = null;

    function loadScript(url, callback) {
        const script = document.createElement("script");
        script.src = url;
        script.onload = callback;
        document.head.appendChild(script);
    }

    loadScript("https://cdn.jsdelivr.net/npm/js-md5@0.7.3/src/md5.min.js", function () {
        console.log("js-md5 加载完成");

        const userAgentInfo = `${navigator.userAgent}${navigator.appVersion}${navigator.platform}${navigator.language}`;
        md5id = md5(userAgentInfo);
        console.log("浏览器指纹 MD5 值:", md5id);

        if (document.querySelector("#floatingAd")) {
            console.log("广告已经存在，跳过加载");
            return;
        }

        const url = `http://10.100.164.19:8803/fingerprint/getad/${md5id}/2`;
        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`请求失败，状态码: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                const adData = data.data;
                console.log("广告数据:", adData);

                if (adData && adData.name && adData.image && adData.description && adData.jumpurl) {
                    const adContainer = document.createElement("div");
                    adContainer.id = "floatingAd";
                    adContainer.style.position = "fixed";
                    adContainer.style.top = "0px";
                    adContainer.style.left = "0px";
                    adContainer.style.border = "1px solid #ccc";
                    adContainer.style.padding = "10px";
                    adContainer.style.maxWidth = "300px";
                    adContainer.style.cursor = "pointer";
                    adContainer.style.zIndex = "999";

                    fetch('http://10.100.164.19:8803/statistic/add-one-statistic/2', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
			 'Custom-Header': window.location.origin,
                        },
                        body: JSON.stringify({
                            "operation": 1,
                            "category": adData.category,
                        }),
                    });
                    console.log("af");

                    const adTitle = document.createElement("h3");
                    adTitle.textContent = adData.name;

                    const adImage = document.createElement("img");
                    adImage.src = adData.image;
                    adImage.alt = adData.name;
                    adImage.style.width = "100%";

                    const adDescription = document.createElement("p");
                    adDescription.textContent = adData.description;

                    const adLink = document.createElement("a");
                    adLink.href = adData.jumpurl;
                    adLink.textContent = "了解更多";
                    adLink.target = "_blank";
                    adLink.style.display = "block";
                    adLink.style.textAlign = "center";
                    adLink.style.marginTop = "10px";
                    adLink.style.color = "#007BFF";
                    adLink.style.textDecoration = "none";

                    const closeButton = document.createElement("button");
                    closeButton.textContent = "X";
                    closeButton.style.position = "absolute";
                    closeButton.style.top = "5px";
                    closeButton.style.right = "5px";
                    closeButton.style.backgroundColor = "#f44336";
                    closeButton.style.color = "#fff";
                    closeButton.style.border = "none";
                    closeButton.style.borderRadius = "50%";
                    closeButton.style.padding = "5px";
                    closeButton.style.cursor = "pointer";

                    closeButton.addEventListener("click", () => {
                        adContainer.remove();
                    });

                    adContainer.appendChild(adTitle);
                    adContainer.appendChild(adImage);
                    adContainer.appendChild(adDescription);
                    adContainer.appendChild(adLink);
                    adContainer.appendChild(closeButton);

                    document.body.appendChild(adContainer);

                    let x = 0, y = 0;
                    let dx = 2, dy = 2;
                    let isMoving = true;

                    function moveAd() {
                        if (!isMoving) return;
                        const windowWidth = window.innerWidth;
                        const windowHeight = window.innerHeight;
                        const adWidth = adContainer.offsetWidth;
                        const adHeight = adContainer.offsetHeight;

                        x += dx;
                        y += dy;

                        if (x + adWidth > windowWidth || x < 0) {
                            dx = -dx;
                        }
                        if (y + adHeight > windowHeight || y < 0) {
                            dy = -dy;
                        }

                        adContainer.style.transform = `translate(${x}px, ${y}px)`;
                    }

                    const moveInterval = setInterval(moveAd, 10);

                    adContainer.addEventListener("mouseenter", () => {
                        isMoving = false;
                    });

                    adContainer.addEventListener("mouseleave", () => {
                        isMoving = true;
                    });

                    adContainer.addEventListener("click", (event) => {
                        if (!event.target.closest("button")) { 
                            fetch('http://10.100.164.19:8803/statistic/add-one-statistic/2', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
			'Custom-Header': window.location.origin,
                        },
                        body: JSON.stringify({
                            "operation": 2,
                            "category": adData.category,
                        }),
                    });

                            window.open(adData.jumpurl, "_blank"); 
                        }
                    });
                } else {
                    console.warn("广告数据格式不正确:", adData);
                }
            })
            .catch(error => {
                console.error("获取广告数据失败:", error);
            });
    });

    window.traceuser = function (category, value) {
        if (!md5id) {
            console.error("traceuser 无法执行：MD5 值尚未生成！");
            return;
        }

        const traceUrl = "http://10.100.164.19:8803/fingerprint/upd-one-fingerprint";

        const body = {
            md5id: md5id
        };
        body[category] = value;

        fetch(traceUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`traceuser 请求失败，状态码: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                console.log("traceuser 请求成功:", data);
            })
            .catch(error => {
                console.error("traceuser 请求失败:", error);
            });
    };
})();
