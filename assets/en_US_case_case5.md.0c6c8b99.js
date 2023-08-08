import{_ as e,o as a,c as t,R as s}from"./chunks/framework.1625126e.js";const g=JSON.parse('{"title":"Nezha server over Argo tunnel","description":"","frontmatter":{},"headers":[],"relativePath":"en_US/case/case5.md","filePath":"en_US/case/case5.md","lastUpdated":1691456305000}'),n={name:"en_US/case/case5.md"},l=s(`<h1 id="nezha-server-over-argo-tunnel" tabindex="-1">Nezha server over Argo tunnel <a class="header-anchor" href="#nezha-server-over-argo-tunnel" aria-label="Permalink to &quot;Nezha server over Argo tunnel&quot;">​</a></h1><p>Contributors:</p><ul><li><a href="https://github.com/fscarmen2" target="_blank" rel="noreferrer">fscarmen</a></li></ul><p>GitHub project: <a href="https://github.com/fscarmen2/Argo-Nezha-Service-Container" target="_blank" rel="noreferrer">Argo-Nezha-Service-Container</a></p><p>Mirror backup (not live update): <a href="https://github.com/nezhahq/Argo-Nezha-Service-Container" target="_blank" rel="noreferrer">Argo-Nezha-Service-Container</a></p><hr><h1 id="catalog" tabindex="-1">Catalog <a class="header-anchor" href="#catalog" aria-label="Permalink to &quot;Catalog&quot;">​</a></h1><ul><li><a href="./case5.html#project-features">Project Features</a></li><li><a href="./case5.html#prepare-variables-to-be-used">Variables to be used</a></li><li><a href="./case5.html#paas-deployment-example">PaaS Deployment Example</a></li><li><a href="./case5.html#vps-deployment-example">VPS Deployment Example</a></li><li><a href="./case5.html#client-access">Client Access</a></li><li><a href="./case5.html#ssh-access">SSH Access</a></li><li><a href="./case5.html#automatically-restore-backups">Auto Restore Backup</a></li><li><a href="./case5.html#manually-restore-the-backup">Manual Restore Backup</a></li><li><a href="./case5.html#migrating-data">Migrating data</a></li><li><a href="./case5.html#main-catalog-files-and-descriptions">Main Directory Files and Descriptions</a></li><li><a href="./case5.html#acknowledgements-for-articles-and-projects-by">Acknowledgment of articles and projects by the following authors</a></li><li><a href="./case5.html#disclaimer">Disclaimer</a></li></ul><hr><h2 id="project-features" tabindex="-1">Project Features. <a class="header-anchor" href="#project-features" aria-label="Permalink to &quot;Project Features.&quot;">​</a></h2><ul><li>Wider scope of application --- As long as there is a network connection, Nezha server can be installed, such as Nas Virtual Machine, Container PaaS, etc.</li><li>Argo tunnel breaks through the restriction of requiring a public network portal --- The traditional Nezha requires two public network ports, one for panel visiting and the other for client reporting, this project uses Cloudflare Argo tunnels and uses intranet tunneling.</li><li>IPv4 / v6 with higher flexibility --- The traditional Nezha needs to deal with IPv4/v6 compatibility between server and client, and also needs to resolve mismatches through tools such as warp. However, this project does not need to consider these issues at all, and can be docked arbitrarily, which is much more convenient and easy!</li><li>One Argo tunnel for multiple domains and protocols --- Create an intranet-penetrating Argo tunnel for three domains (hostname) and protocols, which can be used for panel access (http), client reporting (tcp) and ssh (optional).</li><li>Nginx reverse proxy gRPC data port --- with a certificate for tls termination, then Argo&#39;s tunnel configuration with https service pointing to this reverse proxy, enable http2 back to the source, grpc(nezha)-&gt;h2(nginx)-&gt;argo-&gt;cf cdn edge-&gt;agent</li><li>Daily automatic backup --- every day at 04:00 BST, the entire Nezha panel folder is automatically backed up to a designated private github repository, including panel themes, panel settings, probe data and tunnel information, the backup retains nearly 5 days of data; the content is so important that it must be placed in the private repository.</li><li>Manual/automatic restore backup --- check the content of online restore file once a minute, and restore immediately when there is any update.</li><li>Default built-in local probes --- can easily monitor their own server information</li><li>More secure data --- Argo Tunnel uses TLS encrypted communication to securely transmit application traffic to the Cloudflare network, improving application security and reliability. In addition, Argo Tunnel protects against network threats such as IP leaks and DDoS attacks.</li></ul><img width="1298" alt="image" src="https://github.com/fscarmen2/Argo-Nezha-Service-Container/assets/92626977/6535a060-2138-4c72-9ffa-1175dc6f5c25.png"><h2 id="prepare-variables-to-be-used" tabindex="-1">Prepare variables to be used <a class="header-anchor" href="#prepare-variables-to-be-used" aria-label="Permalink to &quot;Prepare variables to be used&quot;">​</a></h2><ul><li>Easily get Argo tunnel information through Cloudflare Json generation network: <a href="https://fscarmen.cloudflare.now.cc" target="_blank" rel="noreferrer">https://fscarmen.cloudflare.now.cc</a></li></ul><img width="772" alt="image" src="https://github.com/fscarmen2/Argo-Nezha-Service-Container/assets/92626977/98f2c80c-8d45-4c70-b46e-70f552e0b572"><ul><li>Visit Cloudflare website, add the domain name of the client reporting data (tcp) and ssh (optional) in the <code>DNS</code> record of the corresponding domain, and turn on Orange Cloud to enable CDN.</li></ul><img width="1629" alt="image" src="https://github.com/fscarmen2/Argo-Nezha-Service-Container/assets/92626977/39ecc388-e66b-44a2-a339-c80e9d7ed8e2"><img width="1632" alt="image" src="https://github.com/fscarmen2/Argo-Nezha-Service-Container/assets/92626977/1ad2042e-46e6-41c3-9c16-14dc8699ee72"><ul><li>Visit the Cloudflare website, select the domain name you want to use, and turn on the <code>network</code> option to turn the <code>gRPC</code> switch on.</li></ul><img width="1605" alt="image" src="https://github.com/fscarmen2/Argo-Nezha-Service-Container/assets/92626977/533133dc-ab46-43ff-8eec-0b57d776e4a9"><ul><li>Get github authentication license: <a href="https://github.com/settings/applications/new" target="_blank" rel="noreferrer">https://github.com/settings/applications/new</a></li></ul><p>Add <code>https://</code> to the beginning of the panel&#39;s domain name and <code>/oauth2/callback</code> to the end of the callback address.</p><img width="1031" alt="image" src="https://github.com/fscarmen2/Argo-Nezha-Service-Container/assets/92626977/b3218cca-171d-4869-8ff9-7a569d01234a"><img width="1023" alt="image" src="https://github.com/fscarmen2/Argo-Nezha-Service-Container/assets/92626977/c8e6370d-4307-4b88-b490-ce960b694541"><ul><li>Get a PAT (Personal Access Token) for github: <a href="https://github.com/settings/tokens/new" target="_blank" rel="noreferrer">https://github.com/settings/tokens/new</a></li></ul><img width="1368" alt="image" src="https://github.com/fscarmen2/Argo-Nezha-Service-Container/assets/92626977/96b09a43-910c-41c8-b407-1090d81ce728"><img width="1542" alt="image" src="https://github.com/fscarmen2/Argo-Nezha-Service-Container/assets/92626977/b2bf7d3e-2370-4e12-b01d-7cfb9f2d3115"><ul><li>Create a private github repository for backups: <a href="https://github.com/new" target="_blank" rel="noreferrer">https://github.com/new</a></li></ul><img width="716" alt="image" src="https://github.com/fscarmen2/Argo-Nezha-Service-Container/assets/92626977/499fb58d-9dc7-4b3f-84d7-d709d679ec80"><h2 id="paas-deployment-example" tabindex="-1">PaaS Deployment Example <a class="header-anchor" href="#paas-deployment-example" aria-label="Permalink to &quot;PaaS Deployment Example&quot;">​</a></h2><p>Image <code>fscarmen/argo-nezha:latest</code>, supports amd64 and arm64 architectures.</p><p>Variables used</p><table><thead><tr><th>Variable Name</th><th>Required</th><th>Remarks</th></tr></thead><tbody><tr><td>GH_USER</td><td>Yes</td><td>github username for panel admin authorization</td></tr><tr><td>GH_CLIENTID</td><td>yes</td><td>apply on github</td></tr><tr><td>GH_CLIENTSECRET</td><td>yes</td><td>apply on github</td></tr><tr><td>GH_BACKUP_USER</td><td>No</td><td>The github username for backing up Nezha&#39;s server-side database on github, if not filled in, it is the same as the account GH_USER for panel management authorization</td></tr><tr><td>GH_REPO</td><td>No</td><td>The github repository for backing up Nezha&#39;s server-side database files on github</td></tr><tr><td>GH_EMAIL</td><td>No</td><td>github&#39;s mailbox for git push backups to remote repositories</td></tr><tr><td>GH_PAT</td><td>No</td><td>github&#39;s PAT</td></tr><tr><td>ARGO_JSON</td><td>Yes</td><td>Argo Json from <a href="https://fscarmen.cloudflare.now.cc" target="_blank" rel="noreferrer">https://fscarmen.cloudflare.now.cc</a></td></tr><tr><td>DATA_DOMAIN</td><td>Yes</td><td>Client-server communication argo domain name</td></tr><tr><td>WEB_DOMAIN</td><td>Yes</td><td>Panel argo domain</td></tr><tr><td>SSH_DOMAIN</td><td>No</td><td>ssh for argo domain</td></tr><tr><td>SSH_PASSWORD</td><td>no</td><td>password for ssh, only works after setting SSH_JSON, default password</td></tr></tbody></table><p>Koyeb</p><p><a href="https://app.koyeb.com/deploy?type=docker&amp;name=nezha&amp;ports=80;http;/&amp;env%5BGH_USER%5D=&amp;env%5BGH_CLIENTID%5D=&amp;env%5BGH_CLIENTSECRET%5D=&amp;env%5BGH_REPO%5D=&amp;env%5BGH_EMAIL%5D=&amp;env%5BGH_PAT%5D=&amp;env%5BARGO_JSON%5D=&amp;env%5BDATA_DOMAIN%5D=&amp;env%5BWEB_DOMAIN%5D=&amp;env%5BSSH_DOMAIN%5D=&amp;env%5BSSH_PASSWORD%5D=&amp;image=docker.io/fscarmen/argo-nezha" target="_blank" rel="noreferrer"><img src="https://www.koyeb.com/static/images/deploy/button.svg" alt="Deploy to Koyeb"></a></p><img width="927" alt="image" src="https://user-images.githubusercontent.com/92626977/231088411-fbac3e6e-a8a6-4661-bcf8-7c777aa8ffeb.png"><img width="1011" alt="image" src="https://github.com/fscarmen2/Argo-Nezha-Service-Container/assets/92626977/61fad972-1be9-4e8d-829a-8faea0c8ed64"><img width="763" alt="image" src="https://github.com/fscarmen2/Argo-Nezha-Service-Container/assets/92626977/ca294962-f10e-4f4c-b69c-9e95d3d25cac"><img width="1214" alt="image" src="https://github.com/fscarmen2/Argo-Nezha-Service-Container/assets/92626977/ddabdf3a-ca63-4523-b839-62c4d4c0caf2"><img width="881" alt="image" src="https://github.com/fscarmen2/Argo-Nezha-Service-Container/assets/92626977/e623f92d-878f-4eb8-9dfe-55b59770ba2f"><h2 id="vps-deployment-example" tabindex="-1">VPS Deployment Example <a class="header-anchor" href="#vps-deployment-example" aria-label="Permalink to &quot;VPS Deployment Example&quot;">​</a></h2><ul><li>Note: ARGO_JSON= must be followed by single quotes, which cannot be removed.</li><li>If the VPS is IPv6 only, please install WARP IPv4 or dual-stack first: <a href="https://github.com/fscarmen/warp" target="_blank" rel="noreferrer">https://github.com/fscarmen/warp</a></li><li>The backup directory is the dashboard folder in the current path.</li></ul><h3 id="docker-deployment" tabindex="-1">docker deployment <a class="header-anchor" href="#docker-deployment" aria-label="Permalink to &quot;docker deployment&quot;">​</a></h3><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">docker run -dit \\</span></span>
<span class="line"><span style="color:#A6ACCD;">           --name nezha_dashboard \\</span></span>
<span class="line"><span style="color:#A6ACCD;">           --restart always \\</span></span>
<span class="line"><span style="color:#A6ACCD;">           -e GH_USER=&lt;fill in github username&gt; \\</span></span>
<span class="line"><span style="color:#A6ACCD;">           -e GH_EMAIL=&lt;fill in github email&gt; \\</span></span>
<span class="line"><span style="color:#A6ACCD;">           -e GH_PAT=&lt;fill in the obtained&gt; \\</span></span>
<span class="line"><span style="color:#A6ACCD;">           -e GH_REPO=&lt;fill in customized&gt; \\</span></span>
<span class="line"><span style="color:#A6ACCD;">           -e GH_CLIENTID=&lt;fill in acquired&gt; \\</span></span>
<span class="line"><span style="color:#A6ACCD;">           -e GH_CLIENTSECRET=&lt;fill in acquired&gt; \\</span></span>
<span class="line"><span style="color:#A6ACCD;">           -e ARGO_JSON=&#39;&lt;fill in acquired&gt;&#39; \\</span></span>
<span class="line"><span style="color:#A6ACCD;">           -e WEB_DOMAIN=&lt;fill in customized&gt; \\</span></span>
<span class="line"><span style="color:#A6ACCD;">           -e DATA_DOMAIN=&lt;fill in customized&gt; \\</span></span>
<span class="line"><span style="color:#A6ACCD;">           -e SSH_DOMAIN=&lt;fill in customized&gt; \\</span></span>
<span class="line"><span style="color:#A6ACCD;">           -e SSH_PASSWORD=&lt;insert customized&gt; \\</span></span>
<span class="line"><span style="color:#A6ACCD;">           fscarmen/argo-nezha</span></span></code></pre></div><h3 id="docker-compose-deployment" tabindex="-1">docker-compose deployment <a class="header-anchor" href="#docker-compose-deployment" aria-label="Permalink to &quot;docker-compose deployment&quot;">​</a></h3><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">version: &#39;3.8&#39;</span></span>
<span class="line"><span style="color:#A6ACCD;">services.</span></span>
<span class="line"><span style="color:#A6ACCD;">    argo-nezha.</span></span>
<span class="line"><span style="color:#A6ACCD;">        image: fscarmen/argo-nezha</span></span>
<span class="line"><span style="color:#A6ACCD;">        container_name: nezha_dashboard</span></span>
<span class="line"><span style="color:#A6ACCD;">        restart: always</span></span>
<span class="line"><span style="color:#A6ACCD;">        environment:</span></span>
<span class="line"><span style="color:#A6ACCD;">            - GH_USER=&lt;fill in github username&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">            - GH_EMAIL=&lt;fill in your github email&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">            - GH_PAT=&lt;&lt;fill in obtained&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">            - GH_REPO=&lt;fill in customized&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">            - GH_CLIENTID=&lt;fill in obtained&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">            - GH_CLIENTSECRET=&lt;fill in fetched&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">            - ARGO_JSON=&#39;&lt;fill in acquired&gt;&#39;</span></span>
<span class="line"><span style="color:#A6ACCD;">            - WEB_DOMAIN=&lt;fill customized&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">            - DATA_DOMAIN=&lt;fill in customized&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">            - SSH_DOMAIN=&lt;insert customized&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">            - SSH_PASSWORD=&lt;fill customized&gt;</span></span></code></pre></div><h2 id="client-access" tabindex="-1">Client Access <a class="header-anchor" href="#client-access" aria-label="Permalink to &quot;Client Access&quot;">​</a></h2><p>Transfer via gRPC, no additional configuration required. Use the installation method given in the panel, for example</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">curl -L https://raw.githubusercontent.com/naiba/nezha/master/script/install.sh -o nezha.sh &amp;&amp; chmod +x nezha.sh &amp;&amp; sudo ./nezha.sh install_agent data.seales.nom.za 443 eAxO9IF519fKFODlW0 --tls</span></span></code></pre></div><h2 id="ssh-access" tabindex="-1">SSH access <a class="header-anchor" href="#ssh-access" aria-label="Permalink to &quot;SSH access&quot;">​</a></h2><ul><li>Take macOS + WindTerm as an example, and other SSH tools depending on the one used, combined with the official documentation: <a href="https://developers.cloudflare.com/cloudflare-one/connections/connect-apps/use_cases/ssh" target="_blank" rel="noreferrer">https://developers.cloudflare.com/cloudflare-one/connections/connect-apps/use_cases/ssh</a> /#2-connect-as-a-user</li><li>Official cloudflared download: <a href="https://github.com/cloudflare/cloudflared/releases" target="_blank" rel="noreferrer">https://github.com/cloudflare/cloudflared/releases</a></li><li>The following are examples of input commands</li></ul><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">&lt;filepath&gt;/cloudflared access ssh --hostname ssh.seals.nom.za</span></span></code></pre></div><img width="828" alt="image" src="https://github.com/fscarmen2/Argo-Nezha-Service-Container/assets/92626977/25c7bd31-21b5-4684-b1cf-d6d6e0e85058"><img width="830" alt="image" src="https://github.com/fscarmen2/Argo-Nezha-Service-Container/assets/92626977/20a8661c-90b8-4b77-a046-0a2e42d7fee5"><img width="1201" alt="image" src="https://github.com/fscarmen2/Argo-Nezha-Service-Container/assets/92626977/3146b2e2-f988-487f-ab63-00218eb4d570"><h2 id="automatically-restore-backups" tabindex="-1">Automatically restore backups <a class="header-anchor" href="#automatically-restore-backups" aria-label="Permalink to &quot;Automatically restore backups&quot;">​</a></h2><ul><li>Change the name of the file to be restored to <code>README.md</code> in the github backup repository, the timer service will check for updates every minute and record the last synchronized filename in the local <code>/dbfile</code> to compare with the online file content.</li></ul><p>The following is an example of restoring a file with the name <code>dashboard-2023-04-23-13:08:37.tar.gz</code>.</p><p>! <a href="https://user-images.githubusercontent.com/92626977/233822466-c24e94f6-ba8a-47c9-b77d-aa62a56cc929.png" target="_blank" rel="noreferrer">image</a></p><h2 id="manually-restore-the-backup" tabindex="-1">Manually restore the backup <a class="header-anchor" href="#manually-restore-the-backup" aria-label="Permalink to &quot;Manually restore the backup&quot;">​</a></h2><ul><li>ssh into the container and run, tar.gz filename from the github backup repository, format: dashboard-2023-04-22-21:42:10.tar.gz</li></ul><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">bash /dashboard/restore.sh &lt;filename&gt;</span></span></code></pre></div><img width="1209" alt="image" src="https://user-images.githubusercontent.com/92626977/233792709-fb37b79c-c755-4db1-96ec-1039309ff932.png"><h2 id="migrating-data" tabindex="-1">Migrating data <a class="header-anchor" href="#migrating-data" aria-label="Permalink to &quot;Migrating data&quot;">​</a></h2><ul><li>Backup the <code>/dashboard</code> folder of the original Nezha and zip it up to <code>dashboard.tar.gz</code> file.</li></ul><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">tar czvf dashboard.tar.gz /dashboard</span></span></code></pre></div><ul><li>Download the file and put it into a private repository, the name of the repository should be exactly the same as &lt;GH_REPO&gt;, and edit the contents of README.md of the repository to <code>dashboard.tar.gz</code>.</li><li>Deploy the new Nezha in this project, and fill in the variables completely. After the deployment is done, the auto-restore script will check every minute, and will restore automatically if it finds any new content, the whole process will take about 3 minutes.</li></ul><h2 id="main-catalog-files-and-descriptions" tabindex="-1">Main catalog files and descriptions <a class="header-anchor" href="#main-catalog-files-and-descriptions" aria-label="Permalink to &quot;Main catalog files and descriptions&quot;">​</a></h2><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight has-diff"><code><span class="line"><span style="color:#A6ACCD;">.</span></span>
<span class="line"><span style="color:#A6ACCD;">|-- dashboard</span></span>
<span class="line"><span style="color:#A6ACCD;">|   |-- app                  # Nezha panel main program</span></span>
<span class="line"><span style="color:#A6ACCD;">|   |-- argo.json            # Argo tunnel json file, which records information about using the tunnel.</span></span>
<span class="line"><span style="color:#A6ACCD;">|   |-- argo.yml             # Argo tunnel yml file, used for streaming web, gRPC and ssh protocols under a single tunnel with different domains.</span></span>
<span class="line"><span style="color:#A6ACCD;">|   |-- backup.sh            # Backup data scripts</span></span>
<span class="line"><span style="color:#A6ACCD;">|   |-- data</span></span>
<span class="line"><span style="color:#A6ACCD;">|   |   |-- config.yaml      # Configuration for the Nezha panel, e.g. Github OAuth2 / gRPC domain / port / TLS enabled or not.</span></span>
<span class="line"><span style="color:#A6ACCD;">|   |   \`-- sqlite.db        # SQLite database file that records all severs and cron settings for the panel.</span></span>
<span class="line"><span style="color:#A6ACCD;">|   |-- entrypoint.sh        # The main script, which is executed after the container is run.</span></span>
<span class="line"><span style="color:#A6ACCD;">|   |-- nezha-agent          # Nezha client, used to monitor the localhost.</span></span>
<span class="line"><span style="color:#A6ACCD;">|   |-- nezha.csr            # SSL/TLS certificate signing request</span></span>
<span class="line"><span style="color:#A6ACCD;">|   |-- nezha.key            # Private key information for SSL/TLS certificate.</span></span>
<span class="line"><span style="color:#A6ACCD;">|   |-- nezha.pem            # SSL/TLS Privacy Enhancement Email</span></span>
<span class="line"><span style="color:#A6ACCD;">|   \`-- restore.sh           # Restore backup scripts</span></span>
<span class="line"><span style="color:#A6ACCD;">\`-- dbfile                   # Record the name of the latest restore or backup file</span></span></code></pre></div><h2 id="acknowledgements-for-articles-and-projects-by" tabindex="-1">Acknowledgements for articles and projects by <a class="header-anchor" href="#acknowledgements-for-articles-and-projects-by" aria-label="Permalink to &quot;Acknowledgements for articles and projects by&quot;">​</a></h2><ul><li>Robin, an enthusiastic sunrise crowd, for discussing the relationship between Nezha&#39;s server and client, which led to the birth of this project.</li><li>Nezha website: <a href="https://nezha.wiki/" target="_blank" rel="noreferrer">https://nezha.wiki/</a> , TG Group: <a href="https://t.me/nezhamonitoring" target="_blank" rel="noreferrer">https://t.me/nezhamonitoring</a></li><li>Common Poverty International Old Chinese Medicine: <a href="http://solitud.es/" target="_blank" rel="noreferrer">http://solitud.es/</a></li><li>Akkia&#39;s Blog: <a href="https://blog.akkia.moe/" target="_blank" rel="noreferrer">https://blog.akkia.moe/</a></li><li>HiFeng&#39;s Blog: <a href="https://www.hicairo.com/" target="_blank" rel="noreferrer">https://www.hicairo.com/</a></li><li>Intranet Penetration with Cloudflare Tunnel: <a href="https://blog.outv.im/2021/cloudflared-tunnel/" target="_blank" rel="noreferrer">https://blog.outv.im/2021/cloudflared-tunnel/</a></li></ul><h2 id="disclaimer" tabindex="-1">Disclaimer <a class="header-anchor" href="#disclaimer" aria-label="Permalink to &quot;Disclaimer&quot;">​</a></h2><ul><li>This program is only for learning and understanding, non-profit purposes, please delete within 24 hours after downloading, not for any commercial purposes, text, data and images are copyrighted, if reproduced must indicate the source.</li><li>Use of this program is subject to the deployment disclaimer. Use of this program must follow the deployment of the server location, the country and the user&#39;s country laws and regulations, the author of the program is not responsible for any misconduct of the user.</li></ul>`,73),r=[l];function o(i,c,p,h,d,m){return a(),t("div",null,r)}const f=e(n,[["render",o]]);export{g as __pageData,f as default};
