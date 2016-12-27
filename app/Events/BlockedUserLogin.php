<?php
/**
 * BlockedUserLogin.php
 * Copyright (C) 2016 thegrumpydictator@gmail.com
 *
 * This software may be modified and distributed under the terms of the
 * Creative Commons Attribution-ShareAlike 4.0 International License.
 *
 * See the LICENSE file for details.
 */

declare(strict_types = 1);

namespace FireflyIII\Events;

use FireflyIII\User;
use Illuminate\Queue\SerializesModels;

/**
 * Class BlockedUserLogin
 *
 * @deprecated
 * @package FireflyIII\Events
 */
class BlockedUserLogin extends Event
{
    use SerializesModels;

    public $ipAddress;
    public $user;

    /**
     * Create a new event instance. This event is triggered when a blocked user logs in.
     *
     * @param User   $user
     * @param string $ipAddress
     */
    public function __construct(User $user, string $ipAddress)
    {
        $this->user      = $user;
        $this->ipAddress = $ipAddress;
    }
}
