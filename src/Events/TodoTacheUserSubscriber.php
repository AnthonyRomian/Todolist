<?php

namespace App\Events;


use ApiPlatform\Core\EventListener\EventPriorities;
use App\Entity\Tache;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Event\ViewEvent;
use Symfony\Component\HttpKernel\KernelEvents;
use Symfony\Component\Security\Core\Security;

class TodoTacheUserSubscriber implements EventSubscriberInterface
{
    /**
     * @var Security
     */
    private $security;

    public function __construct(Security $security)
    {
        $this->security = $security;
    }

    public static function getSubscribedEvents(): array
    {
        // TODO: Implement getSubscribedEvents() method.
        return [
            KernelEvents::VIEW => ['setUserForTache', EventPriorities::PRE_VALIDATE]
        ];
    }

    public function setUserForTache(ViewEvent $event){

        $tache = $event->getControllerResult();
        $method = $event->getRequest()->getMethod();


        if ($tache instanceof Tache && $method === 'POST'){
            //choper utilisateur connecté
            $user = $this->security->getUser();

            //assigner utiliateur au customer que l on cree
            $tache->setUser($user);

            //new response ($user,$tache);
            new Response();
        }

        /*if ($tache instanceof Tache && $method === 'PUT'){
            //choper utilisateur connecté
            $user = $this->security->getUser();
            //assigner utiliateur au customer que l on cree
            $tache->setUser($user);

            //new Response();
        }*/
    }
}
