___
# TP2 Virt4
# Initiation à Vagrant
# Kevin Simon M2
___

## Partie 1 : Introduction à Vagrant

### Installation :

##### 1. intallation :

```bash
~ $ wget -O- https://apt.releases.hashicorp.com/gpg | sudo gpg --dearmor -o /usr/share/keyrings/hashicorp-archive-keyring.gpg

--2024-02-01 08:16:28--  https://apt.releases.hashicorp.com/gpg
Résolution de apt.releases.hashicorp.com (apt.releases.hashicorp.com)… 99.86.91.78, 99.86.91.49, 99.86.91.124, ...
Connexion à apt.releases.hashicorp.com (apt.releases.hashicorp.com)|99.86.91.78|:443… connecté.
requête HTTP transmise, en attente de la réponse… 200 OK
Taille : 3980 (3,9K) [binary/octet-stream]
Enregistre : ‘STDOUT’

-                                     100%[=========================================================================>]   3,89K  --.-KB/s    ds 0,003s  

2024-02-01 08:16:28 (1,25 MB/s) — envoi vers sortie standard [3980/3980]

~ $ echo "deb [signed-by=/usr/share/keyrings/hashicorp-archive-keyring.gpg] https://apt.releases.hashicorp.com $(lsb_release -cs) main" | sudo tee /etc/apt/sources.list.d/hashicorp.list

deb [signed-by=/usr/share/keyrings/hashicorp-archive-keyring.gpg] https://apt.releases.hashicorp.com jammy main

~ $ sudo apt update && sudo apt install vagrant

...
Les NOUVEAUX paquets suivants seront installés :
  vagrant
...
Préparation du dépaquetage de .../vagrant_2.4.1-1_amd64.deb ...
Dépaquetage de vagrant (2.4.1-1) ...
Paramétrage de vagrant (2.4.1-1) ...
```

##### 2. vérification :

```bash
~$ vagrant up
A Vagrant environment or target machine is required to run this
command. Run `vagrant init` to create a new Vagrant environment. Or,
get an ID of a target machine from `vagrant global-status` to run
this command on. A final option is to change to a directory with a
Vagrantfile and to try again.
```

##### 3. Première VM :

___Réalisant le tp sur machine personnelle la configuration proxy n'est pas nécessaire mais voici ce qui aurait été fait sur machine de l'iut___

```bash
export http_proxy=http://ksimon:<Password>@wwwcache.univ-lr.fr:3128
export https_proxy=https://ksimon:<Password>@wwwcache.univ-lr.fr:3128
vagrant plugin install vagrant-proxyconf
export VAGRANT_HTTP_PROXY=${http_proxy}
export VAGRANT_HTTPS_PROXY=${https_proxy}
export VAGRANT_NO_PROXY=”127.0.0.1”
```

```bash
~ $ mkdir -p Vagrant/VM1 && cd Vagrant/VM1

~/Vagrant/VM1 $ vagrant init ubuntu/focal64
A `Vagrantfile` has been placed in this directory. You are now
ready to `vagrant up` your first virtual environment! Please read
the comments in the Vagrantfile as well as documentation on
`vagrantup.com` for more information on using Vagrant

~/Vagrant/VM1 $ vagrant up

Bringing machine 'default' up with 'virtualbox' provider...
==> default: Box 'ubuntu/focal64' could not be found. Attempting to find and install...
    default: Box Provider: virtualbox
    default: Box Version: >= 0
==> default: Loading metadata for box 'ubuntu/focal64'
    default: URL: https://vagrantcloud.com/api/v2/vagrant/ubuntu/focal64
==> default: Adding box 'ubuntu/focal64' (v20240130.0.0) for provider: virtualbox
    default: Downloading: https://vagrantcloud.com/ubuntu/boxes/focal64/versions/20240130.0.0/providers/virtualbox/unknown/vagrant.box
Download redirected to host: cloud-images.ubuntu.com
==> default: Successfully added box 'ubuntu/focal64' (v20240130.0.0) for 'virtualbox'!
==> default: Importing base box 'ubuntu/focal64'...
==> default: Matching MAC address for NAT networking...
==> default: Checking if box 'ubuntu/focal64' version '20240130.0.0' is up to date...
==> default: Setting the name of the VM: VM1_default_1706774494128_15327
Vagrant is currently configured to create VirtualBox synced folders with
the `SharedFoldersEnableSymlinksCreate` option enabled. If the Vagrant
guest is not trusted, you may want to disable this option. For more
information on this option, please refer to the VirtualBox manual:

  https://www.virtualbox.org/manual/ch04.html#sharedfolders

This option can be disabled globally with an environment variable:

  VAGRANT_DISABLE_VBOXSYMLINKCREATE=1

or on a per folder basis within the Vagrantfile:

  config.vm.synced_folder '/host/path', '/guest/path', SharedFoldersEnableSymlinksCreate: false
==> default: Clearing any previously set network interfaces...
==> default: Preparing network interfaces based on configuration...
    default: Adapter 1: nat
==> default: Forwarding ports...
    default: 22 (guest) => 2222 (host) (adapter 1)
==> default: Running 'pre-boot' VM customizations...
==> default: Booting VM...
==> default: Waiting for machine to boot. This may take a few minutes...
    default: SSH address: 127.0.0.1:2222
    default: SSH username: vagrant
    default: SSH auth method: private key
    default: 
    default: Vagrant insecure key detected. Vagrant will automatically replace
    default: this with a newly generated keypair for better security.
    default: 
    default: Inserting generated public key within guest...
    default: Removing insecure key from the guest if it's present...
    default: Key inserted! Disconnecting and reconnecting using new SSH key...
==> default: Machine booted and ready!
==> default: Checking for guest additions in VM...
    default: The guest additions on this VM do not match the installed version of
    default: VirtualBox! In most cases this is fine, but in rare cases it can
    default: prevent things such as shared folders from working properly. If you see
    default: shared folder errors, please make sure the guest additions within the
    default: virtual machine match the version of VirtualBox you have installed on
    default: your host and reload your VM.
    default: 
    default: Guest Additions Version: 6.1.48
    default: VirtualBox Version: 7.0
==> default: Configuring proxy for Apt...
==> default: Configuring proxy environment variables...
==> default: Configuring proxy for Git...
==> default: Mounting shared folders...
    default: /vagrant => /home/tinsuki/Vagrant/VM1
```

Les interface réseaux sont `enp0s3` et `lo`

le nom de la machine virtuelle crée dans virtualbox est `VM1_default_1706774494128_15327`

##### 4. Customisation de VM sous Vagrant

Le nom du système d'exploitation est `Ubuntu 20.04.6 LTS`.

Le fichier fournis par `wget http://localhost` est la page par défaut d'Apache.

Les commandes de provionnement fournis ici installent est lance un serveur Apache.

Il ne semble pas possible de visualiser la page d'accueil pour le moment depuis la machine physique.

```bash
~/Vagrant/VM1 $ vagrant status
Current machine states:

default                   running (virtualbox)

The VM is running. To stop this VM, you can run `vagrant halt` to
shut it down forcefully, or you can run `vagrant suspend` to simply
suspend the virtual machine. In either case, to restart it again,
simply run `vagrant up`.
```

Il ne semble pas possible de visualiser la page après avoir modifier le fichier `Vagrantfile` et avoir executer `vagrant provision`

Pour redémarer il faut executer `vagrant up` ou `vagrant halt && vagrant up`

Après avoir redémarer le machine virtuelle il est possible de visualiser la page d'accueil avec l'adresse ip `192.168.56.10`

Pour modifier la quantité de ram allouée il faut modifier décommenter les lignes 59; 64 et 65 et modifier le nombre à la ligne 64 (quantité de ram en Mo)

Pour modifier le nom de la vm il faut ajouter `vb.name = "TP1-VM` entre les lignes 59 et 65

Pour modifier le nombre de processeur (coeurs cpu utilisés) il faut ajouter `vb.cpus = 3` entre les lignes 59 et 65.

Cela donne ceci :
```
 config.vm.provider "virtualbox" do |vb|
  #   # Display the VirtualBox GUI when booting the machine
  #   vb.gui = true
  #
  #   # Customize the amount of memory on the VM:
    vb.memory = "2048"
    
    # Customize the name of the VM : 
    vb.name = "TP1-VM"

    vb.cpus = "3"
  end
```

## Partie 2 : Répertoire partagé et sauvegarde

Le chemin vers le dossier partagé dans la machine virtuelle est `/opt/vagrantsite`

```bash
~/Vagrant/VM1 $ vagrant snapshot save default $(date "+%Y%m%d")
==> default: Snapshotting the machine as '20240201'...
==> default: Snapshot saved! You can restore the snapshot at any time by
==> default: using `vagrant snapshot restore`. You can delete it using
==> default: `vagrant snapshot delete`.

~/Vagrant/VM1 $ vagrant snapshot list
==> default: 
20240201
```

Le nom de la snapshot créée est `20240201`

```bash
~/Vagrant/VM1 $ vagrant destroy
    default: Are you sure you want to destroy the 'default' VM? [y/N] y
==> default: Forcing shutdown of VM...
==> default: Destroying VM and associated drives...
```

## Partie 3 : Mutli-Machine

pour valider le fichier il faut executer `vagrant validate`

```bash
~/Vagrant/Multi-VM $ vagrant validate
Vagrantfile validated successfully.
```

