<?php
/** QuickSilver script to notify NUS in the event of a multidev naming policy breach
 *
 * https://github.com/pantheon-systems/quicksilver-examples/blob/main/google_chat_notification/google_chat_notification.php
 *
 * @package MultidevPolicyAlert
 */

namespace QSAlert;

$qs_alert = new MultidevPolicyAlert();
$qs_alert->checkMail();
$qs_alert->sendMail();

class MultidevPolicyAlert
{

    public $site_name;
    public $site_id;
    public $site_env;

    public function __construct()
    {
        $this->setQuicksilverVariables();
    }
    
    /**
    * Set Quicksilver variables from ENV data.
    *
    * @return void
    */
    public function setQuicksilverVariables()
    {
        $this->site_name = $this->getPantheonSiteName();
        $this->site_id   = $this->getPantheonSiteId();
        $this->site_env  = $this->getPantheonEnvironment();
    }
    

    /**
    * Get the Pantheon site name.
    *
    * @return string|null
    */
    public function getPantheonSiteName(): ?string
    {
        return ! empty($_ENV['PANTHEON_SITE_NAME']) ? $_ENV['PANTHEON_SITE_NAME'] : null;
    }

    /**
    * Get the Pantheon siteId.
    *
    * @return string|null
    */
    public function getPantheonSiteId(): ?string
    {
        return ! empty($_ENV['PANTHEON_SITE']) ? $_ENV['PANTHEON_SITE'] : null;
    }
    /**
    * Get the Pantheon environment.
    *
    * @return string|null
    */
    public function getPantheonEnvironment(): ?string
    {
        return ! empty($_ENV['PANTHEON_ENVIRONMENT']) ? $_ENV['PANTHEON_ENVIRONMENT'] : null;
    }

    /**
    * Check if in the Quicksilver context.
    *
    * @return bool|void
    */
    public function isQuicksilver()
    {
        if ($this->isPantheon() && ! empty($_POST['wf_type'])) {
            return true;
        }
        die('No Pantheon Quicksilver environment detected.');
    }

    public function checkMail()
    {
        if (function_exists('mail')) {
            echo( 'mail() is available' . PHP_EOL );
        } else {
            echo( 'mail() has been disabled' . PHP_EOL );
        }
    }

    public function sendMail()
    {
        echo( 'Site ID ' . $this->site_id . PHP_EOL );
        echo( 'Environment Name ' .$this->site_env . PHP_EOL );
        echo( 'Site Name ' .$this->site_name . PHP_EOL );
        $email   = 'edmund.turbin@pantheon.io';
        $subject = "Pantheon Multidev Environment $this->site_env Created";
        $message = "A multidev environment $this->site_env has been created for the site $this->site_name with the SiteID $this->site_id";

        $sendMail = mail($email, $subject, $message);
        
        echo( 'Message: ' . $message . PHP_EOL );
        
        if ($sendMail) {
            echo( 'Email Sent Successfully' . PHP_EOL) ;
        } else {
            echo( 'Mail Failed' );
        }
        echo( '$_ENV array output:' . PHP_EOL );
        var_dump($_ENV);
    }

    /**
    * Determine naming convention breach.
    *
    * @param string $site_env The environment name of the multidev
    */
    public function namingConventionBreach(string $site_env)
    {
        if (preg_match('/^lando/', $site_env, $output_array)) {
            return true;
        } else {
            return false;
        }
    }
}
